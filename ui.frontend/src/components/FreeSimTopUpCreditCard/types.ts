import { topupCreditCmsProps } from "../../layouts/types";

export interface FreeSimTopUpCreditCardProps extends topupCreditCmsProps{
  magentoId?: string;
  prices: number[];
  selectedPrice: number;
  onRemove: (magentoId?: string) => void;
  removeLabel?: string;
}
