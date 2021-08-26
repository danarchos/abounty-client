import { StackScreenProps } from "@react-navigation/stack";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RouteProp } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FC, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import QRCode from "react-qr-code";
import {
  MainNavigatorParamList,
  mainRoutes,
} from "../../navigation/NavigationService";
import Button from "../../components/common/Button";
import useBountyPresenter from "../../navigation/bountyPresenter";
import useViewBountyPresenter from "./viewBountyPresenter";

type IViewBountyScreenProps = {
  route: RouteProp<MainNavigatorParamList, mainRoutes.ViewBounty>;
};

const ViewBounty: FC<IViewBountyScreenProps> = ({ route }) => {
  useEffect(() => {
    initialiseViewBounty(route.params.id);
    console.log("called");
  }, []);

  const { generateBountyInvoice, invoiceQR } = useBountyPresenter();
  const { initialiseViewBounty, description, subject, balance, speakers } =
    useViewBountyPresenter();

  return (
    <View
      style={{
        padding: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>{subject}</Text>
      <Text>{description}</Text>
      <Text>{balance}</Text>
      <Button onPress={() => generateBountyInvoice(route.params.id)}>
        Add Funds
      </Button>
      {invoiceQR && <QRCode value={invoiceQR.payreq} />}
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
