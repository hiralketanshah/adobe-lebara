interface BillOverViewCRow {
  month: string;
  value: number;
}
export interface BillOverviewProps {
  title?: string;
  data?: BillOverViewCRow[];
}
