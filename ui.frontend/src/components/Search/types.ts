interface LinksProps {
  label?: string;
  link?: string;
}
export interface SearchProps {
  closeLinkText?: string;
  searchPlaceholder?: string;
  mostSearchLabel?: string;
  links?: LinksProps[];
  searchRoot?: any;
  emptySearchResultMsg?: string;

  // not in use need to confirm
  menuTitle2?: string;
  recentSearches?: string[];
  isHeaderSearchInput?: boolean;
  isHeaderSearchResult?: boolean;
  onCloseClick?: () => void;
}

export interface SearchResultProps {
    title?: string;
    path?: string;
}

export interface HeaderSearchInputProps extends SearchProps {
  onSearchHandler: ()=>void;
  handleChange: (e: any)=>void;
}
