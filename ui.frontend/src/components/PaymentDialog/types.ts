export interface PaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  paymentMethodLabel?: string;
  isPostpaid?: boolean;
}
