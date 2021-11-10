export interface CancelPlanChangeDialogProps extends PlanChangeDialogCmsProps{
  isOpen: boolean;
  data: number;
  onClose: () => void;
  onConfirm: () => void;
}

export interface PlanChangeDialogCmsProps {
  planChangeTitle?: string;
  planChangeDesc?: string;
  termsConsentLabel?: string;
  termsConditionsLabel?: string;
  termsConditionsLink?: string;
  contractConsentLabel?: string;
  confirmLabel?: string;
  cancelLabel?: string;
}