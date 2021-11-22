export interface HelpProps {
  sectionTitle1: string;
  sectionTitle2: string;
  faqs: FAQProps[];
  browseCategories: BrowseCategoriesProps[];
  onCategoryClick?: () => void;
  searchedFaq: number;
}

export interface HelpSPAProps {
  bcBaseText: string;
  bcCurrentText: string;
  faqsSPAHeading: string;
  faqsSPA: FAQProps[];
}

export interface FAQProps {
  id: number;
  title: string;
  description: string;
}

export interface BrowseCategoriesProps {
  id: string;
  title: string;
  description: string;
  categoryTypes: string[];
}
