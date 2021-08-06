export interface FooterCopyrightProps {
    copyrightInfo : CtaOption[];
    copyrightText?: string;
}

export interface CtaOption {
  label: string;
  link: string;
}