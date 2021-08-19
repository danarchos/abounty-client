import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import React, { FC, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import QRCode from "react-qr-code";

import SignOutButton from "../../components/SignOutButton";
import {
  MainNavigatorParamList,
  mainRoutes,
} from "../../navigation/NavigationService";
import useBountyPresenter from "../../navigation/bountyPresenter";
import { useBountyStore } from "../../stores/BountyStore/BountyStore";
import Button from "../../components/common/Button";

export type DashboardRoutingProps = StackScreenProps<
  MainNavigatorParamList,
  mainRoutes.Dashboard
>;

interface IDashboardScreenProps extends DashboardRoutingProps {}

const Dashboard: FC<IDashboardScreenProps> = () => {
  const { getAllBounties, generateBountyInvoice, invoiceQR } =
    useBountyPresenter();
  const { allBounties } = useBountyStore();

  useEffect(() => {
    getAllBounties();
  }, []);

  if (!allBounties) return null;

  return (
    <View style={{ padding: 10 }}>
      {allBounties?.map((item) => (
        <View key={item.id} style={styles.bountyContainer}>
          <View style={styles.header}>
            <Text>{item.subject}</Text>
            <Button onPress={() => generateBountyInvoice(item.id)}>
              Pay Bounty
            </Button>
          </View>
          <Text style={{ paddingBottom: 50 }}>Current Bounty amount:</Text>
          {invoiceQR && invoiceQR.bountyId === item.id && (
            <QRCode value={invoiceQR.payreq} />
          )}
        </View>
      ))}
      {/* <SignOutButton /> */}
    </View>
  );
};

export default observer(Dashboard);

const styles = StyleSheet.create({
  bountyContainer: {
    borderWidth: 1,
    padding: 20,
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
