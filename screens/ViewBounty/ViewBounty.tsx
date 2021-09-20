import { StackScreenProps } from "@react-navigation/stack";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RouteProp } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FC, useEffect } from "react";
import { View, StyleSheet, Platform, Image } from "react-native";
import QRCode from "react-qr-code";
import {
  MainNavigatorParamList,
  mainRoutes,
} from "../../navigation/NavigationService";
import Button from "../../components/common/Button";
import useViewBountyPresenter from "./viewBountyPresenter";
import styled from "styled-components/native";
import { Text } from "../../components/common/Text";
import AnimateNumber from "react-native-animate-number";
import { ScreenSize } from "../../model/types";
import { useScreenSize } from "../../hooks/useScreenSize";
import { useAuthStore } from "../../stores/AuthStore/AuthStore";

type IViewBountyScreenProps = {
  route: RouteProp<MainNavigatorParamList, mainRoutes.ViewBounty>;
};

const Container = styled.View<{ size?: ScreenSize }>`
  padding: ${({ size }) =>
    size === ScreenSize.desktop ? "100px 200px" : "0px"};
  /* height: 100%; */
  display: flex;
  flex: 1;
`;

const StyledAnimateNumber = styled(AnimateNumber)`
  font-size: 24px;
  font-family: "Rubik";
`;

const ButtonsContainer = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 30px;
`;

const NumberContainer = styled.View`
  margin-bottom: 25px;
`;

const SpeakersContainer = styled.View`
  display: flex;
  flex-direction: column;
`;

const SpeakerInfo = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-left: 10px;
`;

const SpeakerContainer = styled.View<{ bg?: string }>`
  background-color: ${({ bg }) => (bg ? bg : "transparent")};
  border-bottom-width: 1px;
  margin-bottom: 10px;
  height: 70px;
  display: flex;
  flex-direction: row;
  position: relative;
`;

const Main = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 5;
`;

const Status = styled.View<{ bg?: string }>`
  background-color: ${({ bg }) => (bg ? bg : "transparent")};
  width: 100px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FlexContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

const StyledText = styled(Text)``;

const ViewBounty: FC<IViewBountyScreenProps> = ({ route }) => {
  const { listenForPayments, removeListener, updateSpeaker } =
    useViewBountyPresenter();
  const { currentUser } = useAuthStore();

  useEffect(() => {
    initialiseViewBounty(route.params.id);
    listenForPayments(route.params.id);
    return () => {
      removeListener();
    };
  }, []);

  const {
    generateBountyInvoice,
    invoiceQR,
    initialiseViewBounty,
    description,
    subject,
    balance,
    speakers,
    isCurrentUserWanted,
    expireBounty,
  } = useViewBountyPresenter();

  const [size] = useScreenSize();

  console.log({ speakers });

  return (
    <Container size={size}>
      <FlexContainer>
        <View style={{ marginRight: 60, flex: 0.65 }}>
          <Text gutterBottom={8} size="xsmall" textStyle="secondary">
            SUBJECT
          </Text>
          <Text gutterBottom={25} size="xlarge" textStyle="display">
            {subject}
          </Text>
          <Text gutterBottom={8} size="xsmall" textStyle="secondary">
            DESCRIPTION
          </Text>
          <Text gutterBottom={25}>{description}</Text>
        </View>
        <View style={{ flex: 0.35 }}>
          <Text gutterBottom={8} size="xsmall" textStyle="secondary">
            REWARD
          </Text>
          <NumberContainer>
            {Platform.OS === "web" && (
              <StyledAnimateNumber
                value={!balance ? 0 : balance}
                // interval = base number of intervals
                interval={40}
                // steps = frame number
                steps={45}
                formatter={(val: string) => parseFloat(val).toFixed(0)}
              />
            )}
          </NumberContainer>
        </View>
      </FlexContainer>

      <Text gutterBottom={8} size="xsmall" textStyle="secondary">
        WANTED
      </Text>
      <SpeakersContainer>
        {!invoiceQR &&
          speakers.map((item) => (
            <SpeakerContainer key={item.username}>
              <Image
                style={{ height: 68, width: 68, marginRight: 5 }}
                source={{ uri: item.profile_image_url }}
              />
              <SpeakerInfo>
                <Main>
                  <Text
                    // color={item.confirmed ? "white" : "black"}
                    weight="bold"
                    gutterBottom={3}
                  >
                    {item.name}{" "}
                  </Text>
                  <StyledText
                    // color={item.confirmed ? "white" : "black"}
                    size="xsmall"
                  >
                    {" "}
                    @{item.username.toLowerCase()}
                  </StyledText>
                </Main>
                <Text size="small">{item.description}</Text>
              </SpeakerInfo>
              {item.confirmed ? (
                <Status>
                  <Text weight="bold" size="xsmall">
                    {item.confirmed ? "Accepted" : "Unconfirmed"}
                  </Text>
                </Status>
              ) : currentUser.user_metadata.user_name.toLowerCase() ===
                item.username.toLowerCase() ? (
                <Button onPress={updateSpeaker}>Accept</Button>
              ) : (
                <Status>
                  <Text weight="bold" size="xsmall">
                    {item.confirmed ? "Accepted" : "Unconfirmed"}
                  </Text>
                </Status>
              )}
            </SpeakerContainer>
          ))}
      </SpeakersContainer>
      {!invoiceQR && (
        <ButtonsContainer>
          <Button onPress={() => generateBountyInvoice(route.params.id)}>
            Add Funds
          </Button>
          {isCurrentUserWanted && (
            <Button onPress={() => generateBountyInvoice(route.params.id)}>
              Accept Bounty
            </Button>
          )}
        </ButtonsContainer>
      )}
      {invoiceQR && <QRCode value={invoiceQR.payreq} />}
      <Button onPress={() => expireBounty(route.params.id)}>Expire</Button>
    </Container>
  );
};

export default observer(ViewBounty);
