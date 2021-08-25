export interface HeaderProps {
  logoPath?: string;
  items?: Menu[];
  topupCtaText ?: string;
  topupCtaLink?: string;
  accountLink?: string;
}

export interface HeaderIconProps {
  accountLink?: string;

}

export interface Menu {
  title: string;
  url: string;
}
export interface SelectOption {
  title: string;
}