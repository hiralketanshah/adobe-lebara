export interface PlanChangeDialogProps {
  isOpen: boolean;
  fromData: number;
  toData: number;
  onClose: () => void;
  onConfirm: () => void;
}
