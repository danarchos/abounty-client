import React, { FC } from "react";
import styled, { css } from "styled-components/native";
import { switchProp } from "styled-tools";

interface ITextProps {
  textStyle?: "primary" | "secondary" | "display";
  size?: "xsmall" | "small" | "medium" | "large" | "xlarge";
  gutterBottom?: number;
}

const StyledText = styled.Text<ITextProps>`
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
    })};
  ${switchProp("size", {
    xsmall: css`
      font-size: 12px;
    `,
    small: css`
      font-size: 22px;
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
}) => (
  <StyledText gutterBottom={gutterBottom} textStyle={textStyle} size={size}>
    {children}
  </StyledText>
);
