export interface ChoiceButtonsProps {
  text: string;
  buttonOptions: ButtonOptions[];
}

export interface ButtonOptions {
  key: number;
  children: string;
  variant?: string;
  path?: string;
  onClick?: () => void;
  state?: any;
}
