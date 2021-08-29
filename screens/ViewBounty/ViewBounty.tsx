import { StackScreenProps } from "@react-navigation/stack";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RouteProp } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FC, useEffect } from "react";
import { View, StyleSheet, Platform } from "react-native";
import QRCode from "react-qr-code";
import {
  MainNavigatorParamList,
  mainRoutes,
} from "../../navigation/NavigationService";
import Button from "../../components/common/Button";
import useBountyPresenter from "../../navigation/dashboardPresenter";
import useViewBountyPresenter from "./viewBountyPresenter";
import styled from "styled-components/native";
import { Text } from "../../components/Text";
import AnimateNumber from "react-native-animate-number";

type IViewBountyScreenProps = {
  route: RouteProp<MainNavigatorParamList, mainRoutes.ViewBounty>;
};

const Container = styled.View`
  padding: 20px 300px;
`;

const StyledAnimateNumber = styled(AnimateNumber)`
  font-size: 24px;
  font-family: "Rubik";
`;

const ViewBounty: FC<IViewBountyScreenProps> = ({ route }) => {
  const { listenForPayments, removeListener } = useViewBountyPresenter();

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
  } = useViewBountyPresenter();

  return (
    <Container>
      <Text gutterBottom={8} size="xsmall" textStyle="secondary">
        SUBJECT
      </Text>
      <Text gutterBottom={25} size="large" textStyle="display">
        {subject}
      </Text>
      <Text gutterBottom={8} size="xsmall" textStyle="secondary">
        DESCRIPTION
      </Text>
      <Text gutterBottom={25}>{description}</Text>
      <Text gutterBottom={8} size="xsmall" textStyle="secondary">
        REWARD
      </Text>
      {Platform.OS === "web" && (
        <StyledAnimateNumber
          value={balance}
          // interval = base number of intervals
          interval={40}
          // steps = frame number
          steps={45}
          formatter={(val: string) => parseFloat(val).toFixed(0)}
        />
      )}

      <Button onPress={() => generateBountyInvoice(route.params.id)}>
        Add Funds
      </Button>
      {invoiceQR && <QRCode value={invoiceQR.payreq} />}
    </Container>
  );
};

export default observer(ViewBounty);

const styles = StyleSheet.create({
  bountyContainer: {
    borderWidth: 1,
    padding: 20,
  },
  balanceText: {
    fontSize: 40,
  },
  pageContainer: {
    marginHorizontal: 45,
    marginVertical: 20,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
