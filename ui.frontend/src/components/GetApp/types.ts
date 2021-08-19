export interface GetAppProps {
  appTitle?: string;
  links?: getAppOption[];
  backgroundImageMobile?: string;
  backgroundImageDesktop?: string;
  textDescription?: string;
  show?: boolean;
}

export interface getAppOption  {
  label?: string;
  link?: string;
}