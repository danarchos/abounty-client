import Input from "../components/common/Input";
import { observer } from "mobx-react-lite";
import React from "react";
import { Text } from "../components/common/Text";
import useAuthPresenter from "./authPresenter";
import Button from "../components/common/Button";
import { Link } from "@react-navigation/native";
import { authLinks } from "../navigation/NavigationService";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  padding: 20;
`;

const SignUpScreen = observer(() => {
  const { setEmail, email, password, setPassword, performSignUp, loginError } =
    useAuthPresenter();

  return (
    <Container>
      <Text weight="bold">Sign UP</Text>
      <Input
        label="Email"
        value={email}
        onChangeText={(value) => setEmail(value)}
      />
      <Input
        label="Password"
        value={password}
        onChangeText={(value) => setPassword(value)}
        secureTextEntry
      />
      <Button
        onPress={async () => {
          await performSignUp();
        }}
      >
        <Text>Create Account</Text>
      </Button>

      <Link to={`/${authLinks.Login}`}>
        <Button>
          <Text>Have an account?</Text>
        </Button>
      </Link>
    </Container>
  );
});

export default SignUpScreen;
