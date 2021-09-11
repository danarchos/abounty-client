import { observer } from "mobx-react-lite";
import React, { FC, useEffect } from "react";
import { View } from "react-native";
import { Text } from "../../components/common/Text";
import { useRewardStore } from "../../stores/RewardStore/RewardStore";
import styled from "styled-components/native";
import { ScreenSize } from "../../model/types";
import { Image } from "react-native";
import { useAuthStore } from "../../stores/AuthStore/AuthStore";
import navigationService, {
  mainRoutes,
} from "../../navigation/NavigationService";

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

const Rewards: FC = () => {
  const { getRewards, rewards } = useRewardStore();
  const { currentUser } = useAuthStore();

  useEffect(() => {
    getRewards();
  }, [currentUser]);

  return (
    <View
      style={{
        padding: 50,
        display: "flex",
      }}
    >
      <Text textStyle="secondary" size="small" weight="bold" gutterBottom={10}>
        Rewards
      </Text>
      {!rewards.length && <Text>You have no rewards yet</Text>}
      {!!rewards.length &&
        rewards.map((item) => (
          <BountyContainer
            onPress={() =>
              navigationService.navigate(mainRoutes.ViewReward, { id: item.id })
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
    </View>
  );
};

export default observer(Rewards);
