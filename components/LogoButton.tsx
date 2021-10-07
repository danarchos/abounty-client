import React, { FC } from "react";
import { View, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Logo from "./Logo";

type TouchableOpacityProps = React.ComponentProps<typeof TouchableOpacity>;

interface IMenuButton extends TouchableOpacityProps {}

const LogoContainer = styled.View`
  padding: 20px;
`;

const MenuButton: FC<IMenuButton> = ({ onPress }) => {
  return (
    <LogoContainer>
      <TouchableOpacity onPress={onPress}>
        <Logo />
      </TouchableOpacity>
    </LogoContainer>
  );
};

export default MenuButton;
