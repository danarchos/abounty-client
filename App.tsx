import "./init";
import * as Font from "expo-font";

import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import RootNavigator from "./navigation/RootNavigator";
import { SupabaseWrapper } from "./config/SupabaseInit";
import styled from "styled-components/native";

const AppContainer = styled.View`
  height: 100vh;
  width: 100vw;
`;

const App = () => {
  const [loaded] = Font.useFonts({
    Rye: require("./assets/fonts/Rye-Regular.ttf"),
    Rubik: require("./assets/fonts/Rubik.ttf"),
  });

  if (!loaded) return null;

  return (
    <SupabaseWrapper>
      <SafeAreaProvider>
        <AppContainer>
          <RootNavigator />
        </AppContainer>
        <StatusBar />
      </SafeAreaProvider>
    </SupabaseWrapper>
  );
};

export default App;
