import { StackScreenProps } from "@react-navigation/stack";
import Button from "../components/common/Button";
import { observer } from "mobx-react-lite";
import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Input from "../components/common/Input";
import useAuthPresenter from "./authPresenter";
import { Link } from "@react-navigation/native";
import { authLinks } from "../navigation/NavigationService";

const LoginScreen = observer(() => {
  const { setEmail, email, password, setPassword, loginError, performSignIn } =
    useAuthPresenter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>login</Text>
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
          await performSignIn();
        }}
      >
        <Text>Submit</Text>
      </Button>
      {loginError && (
        <Text style={styles.errorText}>
          "There was an error creating your account, please try again"
        </Text>
      )}
      <Link to={`/${authLinks.SignUp}`}>
        <Button>
          <Text>Sign Up</Text>
        </Button>
      </Link>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  errorText: {
    color: "red",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});

export default LoginScreen;
