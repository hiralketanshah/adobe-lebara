interface SupportList {
    body?: string;
    title?: string;
    icon?: string;
    ctaLinkLabel?: string;
    ctaLink?: string;
}
export interface ContactUsProps {
    heading?: string;
    description?: string;
    supportList?: SupportList[];
}
