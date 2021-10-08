import React, { FC } from "react";
import { Button, View } from "react-native";
import { useAuthStore } from "../stores/AuthStore/AuthStore";
import styled from "styled-components/native";

const Container = styled.View`
  width: 20px;
  margin-top: 20px;
`;

const SignOutButton: FC = () => {
  const { signOut } = useAuthStore();
  return (
    <Container>
      <Button
        title="sign out"
        onPress={async () => {
          await signOut();
        }}
      ></Button>
    </Container>
  );
};

export default SignOutButton;
