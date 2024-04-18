"use client";
import {
  createTheme,
  MantineColorsTuple,
  CSSVariablesResolver,
  Button,
} from "@mantine/core";

const brightBlue: MantineColorsTuple = [
  "#e5f4ff",
  "#cde2ff",
  "#9bc2ff",
  "#64a0ff",
  "#3984fe",
  "#1d72fe",
  "#0969ff",
  "#0058e4",
  "#004ecc",
  "#0043b5",
];

export const theme = createTheme({
  primaryColor: "bright-blue",
  colors: {
    "bright-blue": brightBlue,
  },
  components: {
    Button: Button.extend({
      defaultProps: {
        color: "bright-blue.5",
        // variant: "transparent",
      },
    }),
  },
});

export const resolver: CSSVariablesResolver = () => {
  return {
    variables: {},
    light: {},
    dark: {
      "--mantine-color-body": "var(--mantine-color-dark-9)",
    },
  };
};
