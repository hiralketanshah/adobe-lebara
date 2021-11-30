import { FormName } from "../../redux/types/formsTypes";

export interface ChoiceButtonsProps {
  text: string;
  buttonOptions: ButtonOptions[];
  formName?: FormName;
}

export interface ButtonOptions {
  key: number;
  children: string;
  variant?: string;
  path?: string;
  onClick?: () => void;
  state?: any;
}
