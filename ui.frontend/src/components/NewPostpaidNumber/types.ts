
export interface NewPostPaidNumberProps {
  durationLabel?: string;
  moreDetailsLabel?:string;
  dataVolumeLabel?:string;
  abroadMinutesLabel?:string;
  yourOrderLabel?:string;
  productInformationLabel?:string;
  productInformationLink?: string;
  yourOrderContractdurationLabel?:string;
  yourOrderDataLabel?:string;
  yourOrderInternationalMinLabel?:string;
  yourOrderMinutesInGermany?:string;
  yourOrderPerMonthOrderTotalLabel?:string;
  yourOrderOneTimeActivationFeeLabel?:string;
  yourOrderOneTimeActivationFee?:string;
  orderNowLabel?:string;
  durationRadioLabelList?:Array<{label1:string, label2:string}>;
  dataVolumeRadioLabel?: string;
  abroadMinutesRadioLabel?: string;
  yourOrdersimPlanLabel?: string;
  yourOrderMinutesInGermanyValue?: string;
  contractPeriodPopupHeading?: string;
  contractPeriodPopupInfo?: string;
  popupCloseLabel?: string;
  popupDownloadLabel?: string;
  switchCtaLabel?: string;
  dataVolumePopupHeading?: string;
  dataVolumePopupInfo?: string;
  abroadMinutesPopupHeading?: string;
  abroadMinutesPopupInfoTop?: string;
  abroadMinutesPopupInfoBottom?: string;
  countryFlagFrom?: string;
  countryFlagTo?: string;
}
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