import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import React, { FC, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import QRCode from "react-qr-code";

import SignOutButton from "../../components/SignOutButton";
import navigationService, {
  MainNavigatorParamList,
  mainRoutes,
} from "../../navigation/NavigationService";
import useBountyPresenter from "../../navigation/bountyPresenter";
import { useDashboardStore } from "../../stores/DashboardStore/DashboardStore";
import Button from "../../components/common/Button";

export type DashboardRoutingProps = StackScreenProps<
  MainNavigatorParamList,
  mainRoutes.Dashboard
>;

interface IDashboardScreenProps extends DashboardRoutingProps {}

const Dashboard: FC<IDashboardScreenProps> = () => {
  const { getAllBounties, generateBountyInvoice, invoiceQR } =
    useBountyPresenter();
  const { allBounties } = useDashboardStore();

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
            <Button
              onPress={() =>
                navigationService.navigate(mainRoutes.ViewBounty, {
                  id: item.id,
                })
              }
            >
              More
            </Button>
          </View>
          <Text style={{ paddingBottom: 50 }}>
            Current Bounty amount: {item.balance}
          </Text>
        </View>
      ))}
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
