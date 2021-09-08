export interface ProgressStepLinksProps {
    links : Links[];
}

export interface Links {
  parentLinks: PageLinks;
  childLinks: PageLinks[];
}
export interface PageLinks {
  label: string;
  link: string;
}

