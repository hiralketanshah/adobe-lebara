export interface HeaderProps {
  logoPath?: string;
  items?: Menu[];
  topupCtaText ?: string;
  topupCtaLink?: string;
}

export interface HeaderIconProps {

}

export interface Menu {
  title: string;
  url: string;
}