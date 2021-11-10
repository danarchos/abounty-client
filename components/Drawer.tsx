import { DrawerContentComponentProps } from "@react-navigation/drawer";
import React, { FC } from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "./common/Text";
import styled from "styled-components/native";
import { MenuOptions } from "../navigation/MenuOptions";
import navigationService, { mainRoutes } from "../navigation/NavigationService";
import LogoButton from "./LogoButton";
import Button from "./common/Button";
import useAuthPresenter from "../screens/AuthPresenter";

const Container = styled.View`
  background-color: #e5e1db;
  height: 100%;
  padding: 10px 20px;
`;

const NavMenu = styled.View`
  margin-top: 30px;
`;

const Drawer: FC<DrawerContentComponentProps> = ({ state }) => {
  const currentRouteIndex = state?.index;
  const currentRoute = state?.routeNames[currentRouteIndex];
  const { performSignOut } = useAuthPresenter();

  return (
    <Container>
      <View>
        <LogoButton
          onPress={() => navigationService.navigate(mainRoutes.Discover)}
        />
        <NavMenu>
          {MenuOptions.map(({ name, link }) => (
            <TouchableOpacity
              key={link}
              onPress={() => navigationService.navigate(link)}
            >
              <Text
                gutterBottom={10}
                weight={
                  (name === "Discover" && currentRoute === "Main") ||
                    name === currentRoute
                    ? "bold"
                    : "regular"
                }
                size="small"
              >
                {name}
              </Text>
            </TouchableOpacity>
          ))}
        </NavMenu>
        <TouchableOpacity onPress={performSignOut}>
          <Text gutterBottom={20} size="small">
            Log out
          </Text>
        </TouchableOpacity>
        <Button
          onPress={() => {
            navigationService.navigate(mainRoutes.CreateBounty);
          }}
        >
          Create Bounty
        </Button>
      </View>
    </Container>
  );
};

export default Drawer;
