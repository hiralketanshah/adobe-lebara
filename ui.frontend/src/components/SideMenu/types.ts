import { IconType } from "react-icons";

export interface SideMenuItem {
  icon?: IconType | JSX.Element;
  title?: string;
  linkUrl?: string;
  items?: SideMenuItem[];
}

export interface SideMenuProps {
  items?: SideMenuItem[];
}