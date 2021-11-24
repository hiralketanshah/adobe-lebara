interface LinksProps {
  linkText?: string;
  linkPath?: string;
}
export interface SearchProps {
  closeLinkText?: string;
  searchPlaceholder?: string;
  menuTitle1?: string;
  menuTitle2?: string;
  recentSearches?: string[];
  mostSearchesFromUsers?: LinksProps[];
  onCloseClick?: () => void;
}
