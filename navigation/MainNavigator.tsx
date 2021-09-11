import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Discover from "../screens/Discover/Discover.screen";
import CreateBounty from "../screens/CreateBounty/CreateBounty.screen";
import Rewards from "../screens/Rewards/Rewards.screen";
import theme from "../styles/theme/navigationTheme";

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
import { useSupabase } from "use-supabase";
import { View } from "react-native";
import useAuthPresenter from "../screens/authPresenter";
import ViewBounty from "../screens/ViewBounty/ViewBounty";
import ViewReward from "../screens/ViewReward/ViewReward";
import LogoButton from "../components/LogoButton";

const Stack = createStackNavigator<MainNavigatorParamList>();
const Drawer = createDrawerNavigator<MainNavigatorParamList>();

export const MainNavigator: FC = observer(() => {
  const { auth } = useSupabase();

  const { performSignOut, setCurrentUser } = useAuthPresenter();

  useEffect(() => {
    setCurrentUser(auth.user());
  }, [auth]);

  return (
    <NavigationContainer
      linking={mainLinking}
      theme={theme}
      ref={navigationService.navigationRef}
    >
      <Drawer.Navigator
        drawerType="permanent"
        drawerContent={(props) => <DrawerComponent {...props} />}
        drawerStyle={{ width: 200 }}
        drawerPosition="left"
      >
        <Drawer.Screen name={mainRoutes.Discover} component={Discover} />
        <Drawer.Screen
          name={mainRoutes.CreateBounty}
          component={CreateBounty}
        />
        <Drawer.Screen name={mainRoutes.ViewBounty} component={ViewBounty} />
        <Drawer.Screen name={mainRoutes.ViewReward} component={ViewReward} />
        <Drawer.Screen name={mainRoutes.Rewards} component={Rewards} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
});
