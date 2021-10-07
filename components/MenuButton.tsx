import React, { FC } from "react";
import { Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

type TouchableOpacityProps = React.ComponentProps<typeof TouchableOpacity>;

interface IMenuButton extends TouchableOpacityProps {}

const MenuContainer = styled.View`
  padding: 20px;
`;

const MenuButton: FC<IMenuButton> = () => {
  return (
    <MenuContainer style={styles.root}>
      <TouchableOpacity>
        <Text>MENU</Text>
      </TouchableOpacity>
    </MenuContainer>
  );
};

export default MenuButton;
