export interface CartItem {
  magentoId?: string;
  id: number;
  price: number;
  duration: string;
  description: string;
  isAddon?: boolean;
  isFreeSim?: boolean;
}
