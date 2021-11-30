export interface RewardOverviewProps {
  heading?: string;
  description?: string;
  columnHeader1?: string;
  columnHeader2?: string;
  tableItems?: TableItems[];
}

export interface TableItems {
  label1: string;
  label2: string;
}