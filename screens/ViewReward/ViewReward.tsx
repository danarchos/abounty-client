import { RouteProp } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FC, useEffect } from "react";
import QRCode from "react-qr-code";
import {
  MainNavigatorParamList,
  mainRoutes,
} from "../../navigation/NavigationService";
import Button from "../../components/common/Button";
import styled from "styled-components/native";
import { Text } from "../../components/common/Text";
import { ScreenSize } from "../../model/types";
import { useScreenSize } from "../../hooks/useScreenSize";
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
