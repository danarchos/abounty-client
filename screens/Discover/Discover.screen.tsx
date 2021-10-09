import { observer } from "mobx-react-lite";
import React, { FC, useEffect } from "react";
import { View } from "react-native";
import { Text } from "../../components/common/Text";

import navigationService, {
  mainRoutes,
} from "../../navigation/NavigationService";
import useDiscoverPresenter from "../../navigation/discoverPresenter";
import { useDiscoverStore } from "../../stores/DiscoverStore/DiscoverStore";
import styled from "styled-components/native";
import { ScreenSize } from "../../model/types";
import UserThumbnailItem from "../../components/common/UserThumbnailItem";

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

const SpeakerImgs = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const Balance = styled.View`
  flex: 1%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const Subject = styled.View`
  flex: 5;
`;

const Discover: FC = () => {
  const { getAllBounties } = useDiscoverPresenter();
  const { allBounties } = useDiscoverStore();

  useEffect(() => {
    getAllBounties();
  }, []);

  if (!allBounties) return null;

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
            <Subject>
              <Text capitalise textStyle="display">
                {item.subject}
              </Text>
            </Subject>

            <SpeakerImgs>
              {item.speakers.map((item, index) => (
                <UserThumbnailItem
                  key={item.username}
                  source={item.profile_image_url}
                  leftPosition={index * -15}
                />
              ))}
            </SpeakerImgs>
            <Balance>
              <Text size="small">{item.balance ? item.balance : 0}</Text>
            </Balance>
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
