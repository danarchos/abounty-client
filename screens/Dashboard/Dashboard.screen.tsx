import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import React, { FC, useCallback, useEffect, useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import SignOutButton from "../../components/SignOutButton";
import {
  MainNavigatorParamList,
  mainRoutes,
} from "../../navigation/NavigationService";
import axios from "axios";

export type DashboardRoutingProps = StackScreenProps<
  MainNavigatorParamList,
  mainRoutes.Dashboard
>;

interface IDashboardScreenProps extends DashboardRoutingProps {}

const Dashboard: FC<IDashboardScreenProps> = ({ navigation }) => {
  const [data, setData] = useState<any[] | null>(null);
  const [node, setNode] = useState<any>(null);

  const getThis = async () => {
    const response = await axios.get(`http://localhost:4000/bounties`);
    setData(response?.data);
    console.log({ response });
  };

  const generateBountyInvoice = async () => {
    const response = await axios.post(
      `http://localhost:4000/create-bounty-invoice`,
      {
        amount: 20,
        user: "",
      }
    );
    setData(response?.data);
    console.log({ response });
  };

  useEffect(() => {
    getThis();
  }, []);

  if (!data) return null;

  return (
    <View style={{ padding: 10 }}>
      {data?.map((item) => (
        <View key={item.id} style={styles.bountyContainer}>
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
