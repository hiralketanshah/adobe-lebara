import { SearchProps, SearchResultProps } from "../Search/types";

interface LinksProps {
  label?: string;
  link?: string;
}

export interface HelpCenterSearchProps extends SearchProps {
  searchPlaceholder?: string;
  searchRoot?: any;
  emptySearchResultMsg?: string;
}

export interface HelpSearchResultProps extends SearchResultProps {}