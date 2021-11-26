import { topupCreditCmsProps } from "../../layouts/types";

export interface FreeSimTopUpCreditCardProps extends topupCreditCmsProps{
  magentoId?: string;
  prices: number[];
  selectedPrice: number;
  topUpCap?: number;
  onRemove: (magentoId?: string) => void;
  isAutoTopUp?: boolean;
  removeLabel?: string;
  autoRenewLabel?: string;
  autoRenewDesc?: string;
}
