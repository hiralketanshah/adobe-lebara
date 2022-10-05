import { SocialMediaButtonOption } from "../SocialMediaButtons/types";
export interface FooterMenuProps {
  socialButtons?: SocialMediaButtonOption[];
  menu: MenuProps[];
  footerUpperLinks: MenuProps[];
  desktopFootertext: DesktopFooterText;
  theme: MenuThemeProps;
  mobileTheme?: MenuThemeProps;
  followus: FollowusProps;
  getapp: GetAppProps;
  copyrightText: string;
  copyrightLinks: SubMenuProps[];
}
export interface MenuThemeProps {
  color: string;
  bgColor: string;
}


export interface MenuProps {
  label: string;
  parentLinks: SubMenuProps;
  childLinks: SubMenuProps[];
}

export interface SubMenuProps {
  label: string;
  link: string;
  ariaLabel?: string;
}

export interface DesktopFooterText {
  followus: string;
  gettheapp: string;
  termsncondition: string;
  privacypolicy: string;
  copyright: string;
}

export interface FollowusProps {
  followUsText: string;
  links: SubMenuProps[];
  'aria-label'?: string;
}

export interface GetAppProps {
  appTitle: string;
  links: SubMenuProps[];
}