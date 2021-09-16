export interface HeaderProps {
  topupCtaText?: string;
  topupCtaLink?: string;
  accountLink?: string;
  accessibilityLabel?: string;
  id?: string;
  logoPath?: string;
  items?: itemList[]
}

export interface itemList {

  isDisabled?: boolean;

  showNewText?: string;
  imageText?: string;
  level?: number;
  imagePath?: string;
  id?: string;
  path?: string;
  active?: boolean;
  url?: string;
  title?: string;
  children?: Childrens[]
}

export interface Childrens {
  isDisabled?: boolean;
  showNewText?: boolean;
  level?: number;
  id?: string;
  path?: string;
  active?: boolean;
  url?: string;
  title?: string;
  children?: SubChildrens[];
}
export interface SubChildrens {
  isDisabled?: boolean;
  showNewText?: boolean;
  level?: number;
  id?: string;
  path?: string;
  active?: boolean;
  url?: string;
  title?: string;
  children?: [];
}
