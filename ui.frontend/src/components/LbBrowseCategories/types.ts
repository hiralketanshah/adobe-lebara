interface PageLinkProps {
  parentLinks?: ParentLinks[];
  childLinks?: ChildLinkProps[];
}

interface ParentLinks {
  label?: string;
  link?: string;
  description?: string;
}

interface ChildLinkProps {
  label?: string;
  link?: string;
}


interface BrowseCategoriesLinksProps {
  pageLinks?: PageLinkProps;
}


export interface CompProps {
  title?: string;
  browseCategoriesLinks: BrowseCategoriesLinksProps[];
  onCategoryClick?: () => void;
}

