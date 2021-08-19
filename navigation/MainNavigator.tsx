import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "../screens/Dashboard/Dashboard.screen";
import { observer } from "mobx-react-lite";
import React, { FC, useEffect } from "react";
import MenuButton from "../components/MenuButton";
import navigationService, {
  mainLinking,
  MainNavigatorParamList,
  mainRoutes,
} from "./NavigationService";
import DrawerComponent from "../components/Drawer";
import Button from "../components/common/Button";
import useBountyPresenter from "./bountyPresenter";
import { useSupabase } from "use-supabase";
import { View } from "react-native";
import useAuthPresenter from "../screens/authPresenter";

const Stack = createStackNavigator<MainNavigatorParamList>();
const Drawer = createDrawerNavigator<MainNavigatorParamList>();

export const MainNavigator: FC = observer(() => {
  const { auth } = useSupabase();
  const { createBountyPress } = useBountyPresenter();
  const { performSignOut, setCurrentUser } = useAuthPresenter();

  useEffect(() => {
    console.log("called ");
    setCurrentUser(auth.user());
    console.log({ currentUser: auth.user() });
  }, [auth]);

  const MainStack: FC = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerLeft: () => <MenuButton />,
          headerRight: () => (
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Button onPress={createBountyPress}>Create Bounty</Button>
              <Button style={{ marginHorizontal: 20 }} onPress={performSignOut}>
                Log out
              </Button>
            </View>
          ),
        }}
      >
        <Stack.Screen name={mainRoutes.Dashboard} component={Dashboard} />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer
      linking={mainLinking}
      ref={navigationService.navigationRef}
    >
      <Drawer.Navigator
        drawerType="slide"
        drawerContent={DrawerComponent}
        drawerPosition="left"
      >
        <Drawer.Screen name={mainRoutes.Main} component={MainStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
});
