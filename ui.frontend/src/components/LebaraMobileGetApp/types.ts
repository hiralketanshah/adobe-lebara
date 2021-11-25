interface LinkProps {
    label?: string;
    link?: string;
}
export interface LebaraMobileAppProps {
    links?: LinkProps[];
    appTitle?: string;
    backgroundImageDesktop?: string;
    backgroundImageMobile?: string;
    textDescription?: string;
    textCol1?: string[];
    textCol2?: string[];
    getAppLabel?: string;
}
