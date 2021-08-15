import { TextProps } from "@chakra-ui/react";

type FontType =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "button"
  | "caption"
  | "formLabel";
export const fontTypeDetails = {
  h1: {
    weight: "light",
    size: "96px",
    letterSpacing: "-1.5px",
  },
  h2: {
    weight: "light",
    size: "60px",
    letterSpacing: "-0.5px",
  },
  h3: {
    weight: "normal",
    size: "48px",
    letterSpacing: "0",
  },
  h4: {
    weight: "normal",
    size: "34px",
    letterSpacing: "0.25px",
  },
  h5: {
    weight: "normal",
    size: "24px",
    letterSpacing: "0.25px",
  },
  h6: {
    weight: "medium",
    size: "20px",
    letterSpacing: "0.15px",
  },
  subtitle1: {
    weight: "normal",
    size: "16px",
    letterSpacing: "0.15px",
  },
  subtitle2: {
    weight: "medium",
    size: "14px",
    letterSpacing: "0.1px",
  },
  body1: {
    weight: "normal",
    size: "16px",
    letterSpacing: "0.5px",
  },
  body2: {
    weight: "normal",
    size: "14px",
    letterSpacing: "0.25px",
  },
  button: {
    weight: "bold",
    size: "14px",
    letterSpacing: "1.25px",
  },
  caption: {
    weight: "normal",
    size: "12px",
    letterSpacing: "0.4px",
  },
  formLabel: {
    weight: "bold",
    size: "16px",
    letterSpacing: "0.5px",
  },
};

export interface LebaraTextProps extends TextProps {
    type: FontType;
    text: string;
    linkURL?: string;
  }

