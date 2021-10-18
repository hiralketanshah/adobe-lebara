import { topupCreditCmsProps } from "../../layouts/types";

export interface SelectedTopUpCreditCardProps extends topupCreditCmsProps{
  prices: number[];
  magentoId?: string;
  selectedPrice: number;
  onSelectPrice?: (magentoId?: string, amount?: number) => void;
  onRemove?: (magentoId?: string) => void;
  removeLabel?: string,
  autoRenewLabel?: string,
  autoRenewDesc?: string,
}
