export interface ChangePlanDialogProps {
  title: string;
  sku: string;
  magentoId?: string;
  isOpen: boolean;
  onClose: () => void;
  showDetailsLabel?: string;
  selectPlanLabel?: string;
}
