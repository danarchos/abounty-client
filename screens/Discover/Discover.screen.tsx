import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import React, { FC, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "../../components/common/Text";

import SignOutButton from "../../components/SignOutButton";
import navigationService, {
  MainNavigatorParamList,
  mainRoutes,
} from "../../navigation/NavigationService";
import useDiscoverPresenter from "../../navigation/discoverPresenter";
import { useDiscoverStore } from "../../stores/DiscoverStore/DiscoverStore";
import Button from "../../components/common/Button";
import styled from "styled-components/native";
import { Image } from "react-native";
import { ScreenSize } from "../../model/types";
import { useAuthStore } from "../../stores/AuthStore/AuthStore";

export type DiscoverRoutingProps = StackScreenProps<
  MainNavigatorParamList,
  mainRoutes.Discover
>;

interface IDiscoverScreenProps extends DiscoverRoutingProps {}

const BountyContainer = styled.TouchableOpacity`
  border-bottom-width: 1px;
  padding-bottom: 20px;
`;

const Container = styled.View<{ size?: ScreenSize }>`
  padding: ${({ size }) =>
    size === ScreenSize.desktop ? "100px 200px" : "50px"};
  height: 100%;
  display: flex;
`;

const Main = styled.View`
  height: 70px;
  display: flex;
  flex-direction: row;
  position: relative;
  justify-content: space-between;
  align-items: center;
`;

const Discover: FC<IDiscoverScreenProps> = () => {
  const { getAllBounties } = useDiscoverPresenter();
  const { allBounties } = useDiscoverStore();

  const { currentUser } = useAuthStore();

  useEffect(() => {
    getAllBounties();
  }, []);

  if (!allBounties) return null;
  console.log({ currentUser });

  return (
    <Container>
      <Text textStyle="secondary" size="small" weight="bold" gutterBottom={10}>
        Bounties
      </Text>
      {allBounties?.map((item) => (
        <BountyContainer
          onPress={() =>
            navigationService.navigate(mainRoutes.ViewBounty, { id: item.id })
          }
        >
          <Main key={item.id}>
            <View style={{ flex: 5 }}>
              <Text capitalise textStyle="display">
                {item.subject}
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              {item.speakers.map((item, index) => (
                <Image
                  style={{
                    borderWidth: 2,
                    position: "relative",
                    left: index * -15,
                    height: 45,
                    width: 45,
                    marginRight: 5,
                    borderRadius: 50,
                    alignItems: "center",
                  }}
                  source={{ uri: item.profile_image_url }}
                />
              ))}
            </View>
            <View
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <Text size="small">{item.balance ? item.balance : 0}</Text>
            </View>
          </Main>
          <View>
            <Text truncate size="small">
              {item.description}
            </Text>
          </View>
        </BountyContainer>
      ))}
    </Container>
  );
};

export default observer(Discover);
