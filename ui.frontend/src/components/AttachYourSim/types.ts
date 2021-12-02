export interface AttachYourSimProps {
  title?: string;
  linkedSimDesc?: string;
  noLabel?: string;
  attachNewSim?: string;
  activeMonthPlanLabel?: string;
  delinkLabel?: string;
  linkSimLabel?: string;
  noSimLabel?: string;
  ctaContinueLabel?: string;
  mobilePlaceholderLabel?: string;
  delinkConfirmationMsg?: string;
  confirmationEmailLabel?: string;
  followLinkLabel?: string;
  mailNotReceivedLabel?: string;
  clickHereLabel?: string;
  toResendLabel?: string;
}

export interface AttachYourSimDialogProps extends AttachYourSimProps{
  open: boolean;
  close: () => void;
}
