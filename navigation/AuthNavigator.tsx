import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import navigationService, {
  AuthNavigatorParamList,
  authRoutes,
  authLinking,
} from "./NavigationService";
import theme from "../styles/theme/navigationTheme";
import { observer } from "mobx-react-lite";

import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";

const Stack = createStackNavigator<AuthNavigatorParamList>();

export const AuthNavigator = observer(() => {
  return (
    <NavigationContainer
      theme={theme}
      linking={authLinking}
      ref={navigationService.navigationRef}
    >
      <Stack.Navigator>
        <Stack.Screen name={authRoutes.Login} component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
});
