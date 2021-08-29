import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import styled from "styled-components/native";

type PaperButtonProps = React.ComponentProps<typeof PaperButton>;

const StyledPaperButton = styled(PaperButton)`
  background-color: black;
`;

const Button: FC<PaperButtonProps> = ({ children, ...props }) => {
  return (
    <View style={styles.root}>
      <StyledPaperButton
        {...props}
        mode="contained"
        labelStyle={styles.buttonLabel}
      >
        {children}
      </StyledPaperButton>
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
    fontFamily: "Rubik",
  },
});
