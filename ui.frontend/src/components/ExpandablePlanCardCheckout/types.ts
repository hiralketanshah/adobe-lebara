export interface ExpandablePlanCardCheckoutOption {
  title: string;
  description: string;
}
export interface ExpandablePlanCardCheckoutProps {
  magentoId?: string;
  id: number;
  title: string;
  description: string;
  attributes?: string[];
  isExpanded?: boolean;
  options?: ExpandablePlanCardCheckoutOption[][];
  price: number;
  showAutoRenew?: boolean;
  onRemove?: (magentoId?: string, noConfirmation?: boolean) => void;
  hideViewDetails?: boolean;
  isAddon?: boolean;
  isFreeSim?: boolean;
  viewPlansLabel?: string;
  showDetailsLabel?: string;
  removeLabel?: string;
  autoRenewDesc?: string;
  autoRenewLabel?: string;
}
