export interface FooterUpperLinksProps {
    links : Links[];
}

export interface Links {
  parentLinks: ParentLinks;
  childLinks: string[];
}
export interface ParentLinks {
  label: string;
  link: string;
}

