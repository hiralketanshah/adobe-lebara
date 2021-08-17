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
    weight: "bold",
    size: "48px",
    letterSpacing: "0",
  },
  h2: {
    weight: "bold",
    size: "38px",
    letterSpacing: "0",
  },
  h3: {
    weight: "bold",
    size: "32px",
    letterSpacing: "0",
  },
  h4: {
    weight: "normal",
    size: "28px",
    letterSpacing: "0",
  },
  h5: {
    weight: "normal",
    size: "24px",
    letterSpacing: "0",
  },
  h6: {
    weight: "medium",
    size: "20px",
    letterSpacing: "0",
  },
  subtitle1: {
    weight: "normal",
    size: "16px",
    letterSpacing: "0",
  },
  subtitle2: {
    weight: "medium",
    size: "14px",
    letterSpacing: "0",
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