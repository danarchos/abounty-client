import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import React, { FC, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import SignOutButton from "../../components/SignOutButton";
import {
  MainNavigatorParamList,
  mainRoutes,
} from "../../navigation/NavigationService";
import useBountyPresenter from "../../navigation/bountyPresenter";
import { useBountyStore } from "../../stores/BountyStore/BountyStore";

export type DashboardRoutingProps = StackScreenProps<
  MainNavigatorParamList,
  mainRoutes.Dashboard
>;

interface IDashboardScreenProps extends DashboardRoutingProps {}

const Dashboard: FC<IDashboardScreenProps> = () => {
  const { getAllBounties, generateBountyInvoice } = useBountyPresenter();
  const { allBounties } = useBountyStore();

  useEffect(() => {
    getAllBounties();
  }, []);

  if (!allBounties) return null;

  return (
    <View style={{ padding: 10 }}>
      {allBounties?.map((item) => (
        <View key={item.author} style={styles.bountyContainer}>
          <Text>{item.subject}</Text>
          <Button
            title="Pay Bounty"
            onPress={() => generateBountyInvoice()}
          ></Button>
        </View>
      ))}
      {/* <SignOutButton /> */}
    </View>
  );
};

export default observer(Dashboard);

const styles = StyleSheet.create({
  header: {
    backgroundColor: "pink",
    padding: 40,
  },
  pageContainer: {
    marginHorizontal: 45,
    marginVertical: 20,
  },
  bountyContainer: {
    borderWidth: 1,
    padding: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
