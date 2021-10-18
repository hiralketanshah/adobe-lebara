export interface TopUpCreditProps {
  heading: string;
  subheading: string;
  rightTitle: string;
  rightSubTitle: string;
  addToCartLabel: string;
  buyTopUpLabel: string;
  topUpOptions: number[];
  popUpCartMessage: string;
  popUpCtaLabel: string;
  onBuyTopUp?: (amount: number) => void;
  onAddToCart?: (amount: number) => void;
}
