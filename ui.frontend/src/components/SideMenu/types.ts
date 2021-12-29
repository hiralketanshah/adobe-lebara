import { IconType } from "react-icons";

export interface SideMenuItem {
  icon?: IconType | JSX.Element;
  buttonIcon?: IconType | JSX.Element;
  title?: string;
  linkUrl?: string;
  items?: SideMenuItem[];
}

export interface SideMenuProps {
  items?: SideMenuItem[];
  onClose?: () => void;
  menuTitle?: string;
  topupCtaText?: string;
  topupCtaLink?: string;
}
