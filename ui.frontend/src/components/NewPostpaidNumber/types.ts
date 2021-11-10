export interface Plan {
  plan?: string;
  price?: number;
  details: string;
  id: string;
}
export interface NewPostPaidNumberProps {
  plans?: Plan[];
  durationLabel?: string;
  moreDetailsLabel?:string;
  dataVolumeLabel?:string;
  abroadMinutesLabel?:string;
  yourOrderLabel?:string;
  productInformationLabel?:string;
  yourOrderContractdurationLabel?:string;
  yourOrderDataLabel?:string;
  yourOrderInternationalMinLabel?:string;
  yourOrderMinutesInGermany?:string;
  yourOrderPerMonthOrderTotalLabel?:string;
  yourOrderOneTimeActivationFeeLabel?:string;
  yourOrderOneTimeActivationFee?:string;
  orderNowLabel?:string;
  duration?: {};
}
export interface ModalProps {
  open: any;
  onClose: any;
}
