import { SearchProps } from "../Search/types";

export interface HeaderProps {
  isActive?: boolean;
  isDisabled?: boolean;
  logoLinkURL?: string;
  topupCtaText?: string;
  topupCtaLink?: string;
  accountLink?: string;
  accessibilityLabel?: string;
  id?: string;
  newText?: string;
  logoPath?: string;
  items?: children[];
  searchPlaceholder?: string;
  logoutLabel?: string;
  loggedInMenuItems?: LoggedInMenus[];
  search?: SearchProps,
}

export interface children {
  isDisabled?: boolean;
  showNewText?: string;
  imageText?: string;
  imagePath?: string;
  simImage?: string;
  level?: number;
  id?: string;
  path?: string;
  active?: boolean;
  url?: string;
  title?: string;
  children?: children[];
}

export interface LoggedInMenus {
  label?: string;
  link?: string;
  icon?: string;
}
