import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import React, { FC, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import QRCode from "react-qr-code";
import { TextInput } from "react-native-paper";

import SignOutButton from "../../components/SignOutButton";
import {
  MainNavigatorParamList,
  mainRoutes,
} from "../../navigation/NavigationService";
import useBountyPresenter from "../../navigation/bountyPresenter";
import { useBountyStore } from "../../stores/BountyStore/BountyStore";
import Button from "../../components/common/Button";
import useCreateBountyPresenter from "./createBountyPresenter";

export type DashboardRoutingProps = StackScreenProps<
  MainNavigatorParamList,
  mainRoutes.Dashboard
>;

interface IDashboardScreenProps extends DashboardRoutingProps {}

const CreateBounty: FC<IDashboardScreenProps> = () => {
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
      <TextInput
        style={{ width: 200, marginBottom: 10 }}
        label="Subject"
        value={""}
        onChangeText={() => {}}
      />
      <TextInput
        style={{ width: 200, marginBottom: 10 }}
        label="Description"
        value={""}
        onChangeText={() => {}}
      />
      <Button onPress={createBountySubmit}>Create Bounty</Button>
    </View>
  );
};

export default observer(CreateBounty);

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
