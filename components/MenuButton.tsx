import React, { FC } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Button from "./common/Button";

type TouchableOpacityProps = React.ComponentProps<typeof TouchableOpacity>;

interface IMenuButton extends TouchableOpacityProps {}

const MenuButton: FC<IMenuButton> = () => {
  return (
    <View style={styles.root}>
      <TouchableOpacity>
        <Text>MENU</Text>
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
