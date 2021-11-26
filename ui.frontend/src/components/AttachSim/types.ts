export default interface AttachSimProps {
  open: boolean;
  continueClick: () => void;
}
export interface AttachSimPopupProps {
  open: boolean;
  showActivateYourSimMobile: (mobile: string) => void;
}
export interface ActivateYourSimMobileProps {
  open: boolean;
  mobile?: string;
  onEdit: () => void;
  continueClick?: () => void;
}
