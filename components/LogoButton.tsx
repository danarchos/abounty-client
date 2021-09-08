import React, { FC } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { mainRoutes } from "../navigation/NavigationService";
import Button from "./common/Button";
import Logo from "./Logo";

type TouchableOpacityProps = React.ComponentProps<typeof TouchableOpacity>;

interface IMenuButton extends TouchableOpacityProps {}

const MenuButton: FC<IMenuButton> = ({ onPress }) => {
  return (
    <View style={styles.root}>
      <TouchableOpacity onPress={onPress}>
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
