export interface FooterMenuProps {
  footerUpperLinks: MenuProps[];
  desktopFootertext: DesktopFooterText;
  followus: FollowusProps;
  getapp: GetAppProps;
  copyrightText: string;
}

export interface MenuProps {
  label: string;
  parentLinks: SubMenuProps;
  childLinks: SubMenuProps[];
}

export interface SubMenuProps {
  label: string;
  link: string;
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