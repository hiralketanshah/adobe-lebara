export interface PaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  paymentMethodLabel?: string;
}
