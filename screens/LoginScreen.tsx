import Button from "../components/common/Button";
import { observer } from "mobx-react-lite";
import React from "react";

import styled from "styled-components/native";
import { Text } from "../components/common/Text";
import useAuthPresenter from "./AuthPresenter";

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const LoginScreen = observer(() => {
  const { loginError, performSignIn } = useAuthPresenter();
  return (
    <Container>
      <Button
        onPress={async () => {
          await performSignIn();
        }}
      >
        <Text size="xsmall" color="white">
          Login with twitter
        </Text>
      </Button>
      {loginError && (
        <Text color="red">
          "There was an error creating your account, please try again"
        </Text>
      )}
    </Container>
  );
});

export default LoginScreen;
