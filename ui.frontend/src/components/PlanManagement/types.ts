import { PlanChangeDialogCmsProps } from "../CancelPlanChangeDialog/types";

export interface PlansProps extends PlanChangeDialogCmsProps{
  buttonText?: string;
  hidePrice?: boolean;
  hideAutoRenew?: boolean;
  showManageButton?: boolean;
  requestPlanRemoved?: boolean;
  renewalLabel?: string;
  planChangeMessage?: string;
  cancelLabel?: string;
  manageLabel?: string;
  manageLink?: string;
  autoRenewLabel?: string;
  autoRenewDesc?: string;
  planLabels?: DashboardPlanLabelsProps;
}

export interface DashboardPlanLabelsProps{
  dataPlanName?: string;
  dataType?: string;
  minPlanName?: string;
  minDataType?: string;
  smsPlanName?: string;
  smsDataType?: string;
  internationalMinPlanName?: string;
  internationalMinDataType?: string;
  leftOfLabel?: string;
}
