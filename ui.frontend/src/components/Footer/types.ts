import { SocialMediaButtonOption } from "../SocialMediaButtons/types";
import { MenuThemeProps } from "../FooterMenu/types";

export interface FooterProps {
  theme?: MenuThemeProps;
  socialButtons?: SocialMediaButtonOption[];
  footerUpperLinks?: MenuProps[];
  followus?: FollowusProps;
  getapp?: GetAppProps;
  copyrightText?: string;
}

export interface MenuProps {
  label?: string;
  parentLinks?: SubMenuProps;
  childLinks?: SubMenuProps[];
}

export interface SubMenuProps {
  label?: string;
  link?: string;
}

export interface FollowusProps {
  followUsText?: string;
  links?: SubMenuProps[];
}

export interface GetAppProps {
  appTitle?: string;
  links?: SubMenuProps[];
}