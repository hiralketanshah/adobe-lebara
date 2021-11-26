export interface GetAppProps {
  appTitle?: string;
  links?: getAppOption[];
  backgroundImageMobile?: string;
  backgroundImageDesktop?: string;
  textDescription?: string;
  show?: boolean;
  textCol1?: string[];
  textCol2?: string[];
  getAppLabel?: string;
}

export interface getAppOption  {
  label?: string;
  link?: string;
}