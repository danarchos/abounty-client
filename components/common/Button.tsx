import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import styled from "styled-components/native";

type PaperButtonProps = React.ComponentProps<typeof PaperButton>;

const StyledPaperButton = styled(PaperButton)`
  background-color: black;
`;

const ButtonContainer = styled.View`
  max-width: 200px;
  margin: auto;
`;

const Button: FC<PaperButtonProps> = ({ children, ...props }) => {
  return (
    <ButtonContainer>
      <StyledPaperButton
        {...props}
        mode="contained"
        labelStyle={styles.buttonLabel}
      >
        {children}
      </StyledPaperButton>
    </ButtonContainer>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonLabel: {
    color: "white",
    fontFamily: "Rubik",
  },
});
