import { InputProps } from "../Input/types";
import { ButtonProps } from "../Button/types";

export interface SplitInputWithButtonProps extends InputProps {
  buttonProps: ButtonProps;
  isDisabled?: boolean;
  onClick?: () => void;
  buttonLabel?: string;
}
