export interface TopUpCreditProps {
  heading: string;
  subheading: string;
  topUpOptions: number[];
  onBuyTopUp?: (amount: number) => void;
  onAddToCart?: (amount: number) => void;
}
