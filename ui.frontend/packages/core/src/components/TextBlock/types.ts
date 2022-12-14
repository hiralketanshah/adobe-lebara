export interface TextBlockProps {
  slogan?: string;
  header?: string;
  subHeader?: string;
  buttonText?: string;
  linkURL?: string;
  imagePath?: string;
  buttonStyle?: string;
  isFullWidthButton?: boolean;
  headingType?: string;
  desktopListItems?: string[];
  buttonCustomMakeup?: {
    buttonBackgroundColor?: string;
    buttonTextColor?: string;
    buttonHoverBgColor?: string;
    buttonHoverTextColor?: string;
  }
}
