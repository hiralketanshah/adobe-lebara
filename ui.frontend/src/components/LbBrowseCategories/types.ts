
interface ChildLinkProps {
  label?: string;
  link?: string;
}
interface ParentLinks {
  label?: string;
  link?: string;
  description?: string;
}

interface PageLinkProps {
  parentLinks?: ParentLinks;
  childLinks?: ChildLinkProps[];
}
interface BrowseCategoriesLinksProps {
  pageLinks?: PageLinkProps;
}


export interface CompProps {
  title?: string;
  browseCategoriesLinks: BrowseCategoriesLinksProps[];
  onCategoryClick?: () => void;
}

