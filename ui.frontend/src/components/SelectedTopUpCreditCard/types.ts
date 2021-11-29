import { topupCreditCmsProps } from "../../layouts/types";

export interface SelectedTopUpCreditCardProps extends topupCreditCmsProps{
  prices: number[];
  magentoId?: string;
  selectedPrice: number;
  onSelectPrice?: (
    magentoId?: string,
    amount?: number,
    isAutoTopUp?: boolean,
    topUpCap?: number
  ) => void;
  onRemove?: (magentoId?: string) => void;
  showAutoRenew?: boolean;
  isAutoTopUp?: boolean;
  topUpCap?: number;
  removeLabel?: string,
  autoRenewLabel?: string,
  autoRenewDesc?: string,
}
