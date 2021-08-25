import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import React, { FC, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import QRCode from "react-qr-code";

import {
  MainNavigatorParamList,
  mainRoutes,
} from "../../navigation/NavigationService";
import Button from "../../components/common/Button";
import useCreateBountyPresenter from "./viewBountyPresenter";

export type DashboardRoutingProps = StackScreenProps<
  MainNavigatorParamList,
  mainRoutes.Dashboard
>;

interface IDashboardScreenProps extends DashboardRoutingProps {}

const ViewBounty: FC<IDashboardScreenProps> = () => {
  const { createBountySubmit } = useCreateBountyPresenter();
  return (
    <View
      style={{
        padding: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button onPress={createBountySubmit}>Add Funds</Button>
    </View>
  );
};

export default observer(ViewBounty);

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
