export interface MyBalanceCardProps {
  title?: string;
  description?: string;
  topupLabel?: string;
  autoTopupLabel?: string;
  activeLabel?: string;
  activeDesc?: string;
  editLabel?: string;
  topupSelectLabel?: string;
  limitSelectLabel?: string;
  autoTopupStatusLabel?: string;
  autoTopupButtonLabel?: string;
  topUpOptions: number[];
}

export interface AutoTopUpProps extends MyBalanceCardProps{
  open: boolean;
  close: () => void;
}
