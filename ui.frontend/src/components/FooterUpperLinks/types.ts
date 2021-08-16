export interface FooterUpperLinksProps {
    links : Links[];
}

export interface Links {
  parentLinks: ParentLinks;
  childLinks: ParentLinks[];
}
export interface ParentLinks {
  label: string;
  link: string;
}

