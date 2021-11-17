
interface LinkBaseProps {
  children: string;
  href: string;
  color: string;
}

export interface CompProps {
  heading?: string;
  description?: string;
  sectionHeading?: string;
  sectionSubHeading?: string;
  link?: LinkBaseProps;
  noPadding?: boolean;
}