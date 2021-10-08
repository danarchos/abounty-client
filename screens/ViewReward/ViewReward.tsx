import { StackScreenProps } from "@react-navigation/stack";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RouteProp } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FC, useEffect } from "react";
import { View } from "react-native";
import QRCode from "react-qr-code";
import {
  MainNavigatorParamList,
  mainRoutes,
} from "../../navigation/NavigationService";
import Button from "../../components/common/Button";
import styled from "styled-components/native";
import { Text } from "../../components/common/Text";
import AnimateNumber from "react-native-animate-number";
import { ScreenSize } from "../../model/types";
import { useScreenSize } from "../../hooks/useScreenSize";
import { useAuthStore } from "../../stores/AuthStore/AuthStore";
import useViewRewardPresenter from "./viewRewardBounty";

type IViewRewardScreenProps = {
  route: RouteProp<MainNavigatorParamList, mainRoutes.ViewReward>;
};

const Container = styled.View<{ size?: ScreenSize }>`
  padding: ${({ size }) =>
    size === ScreenSize.desktop ? "100px 200px" : "0px"};
  height: 100%;
  display: flex;
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

const Metadata = styled.View`
  margin-right: 60px;
  flex: 0.65;
`;

const Reward = styled.View`
  flex: 0.35;
`;

const ViewReward: FC<IViewRewardScreenProps> = ({ route }) => {
  const { initialiseViewReward, subject, handleWithdraw, withdrawRequest } =
    useViewRewardPresenter();

  useEffect(() => {
    initialiseViewReward(route.params.id);
  }, []);

  const [size] = useScreenSize();

  return (
    <Container size={size}>
      <FlexContainer>
        <Metadata>
          <Text gutterBottom={8} size="xsmall" textStyle="secondary">
            SUBJECT
          </Text>
          <Text gutterBottom={25} size="xlarge" textStyle="display">
            {subject}
          </Text>
          <Text gutterBottom={8} size="xsmall" textStyle="secondary">
            DESCRIPTION
          </Text>
        </Metadata>

        <Reward>
          <Text gutterBottom={8} size="xsmall" textStyle="secondary">
            REWARD
          </Text>
          <Button onPress={handleWithdraw}>Withdraw</Button>
        </Reward>
      </FlexContainer>
      {withdrawRequest && <QRCode value={withdrawRequest} />}
    </Container>
  );
};

export default observer(ViewReward);
