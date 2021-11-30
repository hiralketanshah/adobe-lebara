interface LinksProps {
  label?: string;
  link?: string;
}
export interface SearchProps {
  closeLinkText?: string;
  searchPlaceholder?: string;
  mostSearchLabel?: string;
  links?: LinksProps[];
  onCloseClick?: () => void;
  searchRootPagePath?: any;
  emptySearchResultMsg?: string;

  // not in use need to confirm
  menuTitle2?: string;
  recentSearches?: string[];
}

export interface SearchResultProps {
    title?: string;
    path?: string;
}
