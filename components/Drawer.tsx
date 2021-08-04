import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { Link } from "@react-navigation/native";
import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { MenuOptions } from "../navigation/MenuOptions";
import navigationService from "../navigation/NavigationService";
import SignOutButton from "./SignOutButton";

const Drawer: FC<DrawerContentComponentProps> = ({ state, navigation }) => {
  return (
    <View>
      {/* {MenuOptions.map(({ name, link, icon }) => {
        // TODO: better styling
        return (
          <Link
            to={link}
            style={styles.listItemContainer}
            onPress={() => navigationService.navigate(link)}
          >
            <View style={styles.linkContainer}>
              {icon}
              <Text>{name}</Text>
            </View>
          </Link>
        );
      })} */}
      <SignOutButton />
    </View>
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    justifyContent: "space-between",
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Drawer;
