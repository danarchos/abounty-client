import React, { FC } from "react";
import styled, { css } from "styled-components/native";
import { switchProp, ifProp } from "styled-tools";

interface ITextProps {
  textStyle?: "primary" | "secondary" | "display";
  size?: "xsmall" | "small" | "medium" | "large" | "xlarge";
  gutterBottom?: number;
  weight?: "regular" | "bold";
  color?: string;
  truncate?: boolean;
  capitalise?: boolean;
}

const StyledText = styled.Text<ITextProps>`
  ${ifProp(
    { capitalise: true },
    css`
      text-transform: capitalize;
    `
  )};
  font-weight: ${ifProp({ weight: "bold" }, "bold", "regular")};
  color: ${({ color }) => color};
  margin-bottom: ${({ gutterBottom }) =>
      gutterBottom ? `${gutterBottom}px` : "0px"}
    ${switchProp("textStyle", {
      primary: css`
        font-family: "Rubik";
      `,
      secondary: css`
        font-family: "Rubik";
        color: grey;
      `,
      display: css`
        font-family: "Rye";
      `,
    })}
    ${switchProp("size", {
      xsmall: css`
        font-size: 12px;
      `,
      small: css`
        font-size: 18px;
      `,
      medium: css`
        font-size: 24px;
      `,
      large: css`
        font-size: 36px;
      `,
      xlarge: css`
        font-size: 42px;
      `,
    })};
`;

export const Text: FC<ITextProps> = ({
  children,
  textStyle = "primary",
  size = "medium",
  gutterBottom,
  weight = "regular",
  color = "black",
  truncate = false,
  capitalise = false,
}) => (
  <StyledText
    weight={weight}
    gutterBottom={gutterBottom}
    textStyle={textStyle}
    size={size}
    color={color}
    numberOfLines={truncate ? 1 : 0}
    capitalise={capitalise}
  >
    {children}
  </StyledText>
);
