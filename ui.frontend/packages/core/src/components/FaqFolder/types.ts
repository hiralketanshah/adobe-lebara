export interface options {
  question?: string;
  answer?: string;
}
export interface HomeFaqsProps {
  title?: string;
  options: options[] | [];
  backgroundColor?: string;
  showStructuredData?: boolean;
}
