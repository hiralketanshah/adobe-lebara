
export interface ModalProps {
  open: any;
  onClose: any;
  heading?: string;
  info?:string;
  closeLabel?: string;
  additionalInfo?: string;
  countryFlagFrom?: string;
  countryFlagTo?: string;
}
export interface PlanDurationProps {
  data: number;
  minutes: number;
  planDuration: string;
}
export interface SelectedPlanProps {
  offerId: number;
  name: string;
  cost: number;
}