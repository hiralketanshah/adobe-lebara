export interface FooterCopyrightProps {
    links : CtaOption[];
    copyrightText?: string;
}

export interface CtaOption {
  label: string;
  link: string;
}