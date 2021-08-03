import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import { Button as PaperButton } from "react-native-paper";

type PaperButtonProps = React.ComponentProps<typeof PaperButton>;

const Button: FC<PaperButtonProps> = ({ children, ...props }) => {
  return (
    <View style={styles.root}>
      <PaperButton {...props} mode="contained" labelStyle={styles.buttonLabel}>
        {children}
      </PaperButton>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  root: {
    maxWidth: 200,
    margin: "auto",
  },
  buttonLabel: {
    color: "white",
  },
});
