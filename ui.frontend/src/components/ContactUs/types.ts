interface SupportList {
    body?: string;
    title?: string;
    icon?: string;
    ctalinklabel?: string;
    ctalink?: string;
}
export interface ContactUsProps {
    heading?: string;
    description?: string;
    supportList?: SupportList[];
}
