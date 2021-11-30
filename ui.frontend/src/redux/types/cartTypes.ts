export interface CartItem {
  magentoId?: string;
  id: number;
  price: number;
  duration: string;
  description: string;
  isAddon?: boolean;
  isFreeSim?: boolean;
  isFreeSimTopup?: boolean;
  isTopUp?: boolean;
  isPrepaid?: boolean;
  isPostPaid?: boolean;
  details?: string[];
  isAutoTopUp?: boolean;
  isAutoRenew?: boolean;
  topUpCap?: number;
}
