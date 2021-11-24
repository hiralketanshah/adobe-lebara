import { ProgressBarCardProps } from "../ProgressBarCard/types";

export interface YourPlansCardProps {
  planName: string;
  buttonText: string;
  plans: ProgressBarCardDataProps[];
  fullWidth?: boolean;
  isPrepaid?: boolean;
  msisdn?: string;
  title: string;
  manageLabel: string;
  leftOfText: string;
  plansTabNames: string[];
  ctaDashboardManageURL: string;
}

export interface ProgressBarCardDataProps extends ProgressBarCardProps {
  planTabName: string;
}
