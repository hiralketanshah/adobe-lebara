export interface PurchaseSummaryItemOption {
  description: string;
  amount: number;
}
export interface PurchaseSummaryProps {
  items: PurchaseSummaryItemOption[];
  grandTotalLabel?: string;
}
