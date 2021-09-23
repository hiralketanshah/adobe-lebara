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

export interface MenuOption {
  menuName: string;
  isDisabled: boolean;
  subMenuOption?: SubMenuOptions[];
}

export interface SubMenuOptions {
  menuOptionName: string;
  subMenuOptions: MenuProperties[];
}

export interface MenuProperties {
  path?: string;
  subMenuOptionName: string;
  isDisabled: boolean;
  isNewPlan: boolean;
}