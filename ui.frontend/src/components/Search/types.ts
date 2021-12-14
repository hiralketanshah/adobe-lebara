interface LinksProps {
  label?: string;
  link?: string;
}
export interface SearchProps {
  closeLinkText?: string;
  searchPlaceholder?: string;
  mostSearchLabel?: string;
  recentSearchLabel?: any;
  links?: LinksProps[];
  searchRoot?: any;
  emptySearchResultMsg?: string;

  // not in use need to confirm
  menuTitle2?: string;
  recentSearches?: string[];
  showSearchResults?: boolean;
  hideSearchResults?: boolean;
  isHeaderSearchInput?: boolean;
  onCloseClick?: () => void;
  onHandleSearchQuery?: ({isQuery, results}:any) => void;
  searchValue?: string;
}

export interface SearchResultProps extends SearchProps {
    title?: string;
    path?: string;
  }

export interface HeaderSearchInputProps extends SearchProps {
  onSearchHandler: ()=>void;
  handleChange: (e: any)=>void;
  searchValue?: string;
}
