import { HeaderProps } from "../Header/types";
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
export interface MiniHeaderProps extends HeaderProps {
  logoLinkURL?: string;
  logoPath?: string;
  accountLink?: string;
  items?: children[];
}
