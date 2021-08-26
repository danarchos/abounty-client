import { useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { mainRoutes } from "../navigation/NavigationService";
import Button from "./common/Button";
import Logo from "./Logo";

type TouchableOpacityProps = React.ComponentProps<typeof TouchableOpacity>;

interface IMenuButton extends TouchableOpacityProps {}

const MenuButton: FC<IMenuButton> = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.root}>
      <TouchableOpacity
        onPress={() => navigation.navigate(mainRoutes.Dashboard)}
      >
        <Logo />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 20,
  },
});

export default MenuButton;
