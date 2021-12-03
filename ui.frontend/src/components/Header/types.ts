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
export interface HeaderProps {
  logolinkurl?: string;
  topupCtaText?: string;
  topupCtaLink?: string;
  accountLink?: string;
  accessibilityLabel?: string;
  id?: string;
  newText?: string;
  logoPath?: string;
  items?: children[];
  searchPlaceholder?: string;
}