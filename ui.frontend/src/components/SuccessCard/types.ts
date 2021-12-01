import { IconType } from "react-icons/lib";
import { ReactElement } from "react";

export interface SuccessCardProps {
  icon: IconType;
  title?: string;
  subtitle?: string;
  msisdn?: string;
  extraButton?: ReactElement;
  orderIdTitle?: string;
  simOnlyTitle?: string;
  orderIdSubtitle?: string;
  simOnlySubtitle?: string;
  planChangeSubtitle?: string;
  dashboardButtonLabel?: string;
}
