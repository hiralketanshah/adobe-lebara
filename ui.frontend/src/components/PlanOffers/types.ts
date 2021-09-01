
import { ExpandablePlanCardProps } from "../ExpandablePlanCard/types";

export interface PlanOffersProps {
  title?: string;
  subTitle?: string;
  description?: string;
  hideLabel?: string;
  minutesField?: string;
  showLabel?: string;
  ctaTopLink?: string;
  ctaTopLabel?: string;
  ctaBottomLink?: string;
  ctaBottomLabel?: string;
  buttonLabel?: string;
  offers?: ExpandablePlanCardProps[];
  unlimitedTextField?: string;
  allowanceList?: allowanceListProps;
}

export interface allowanceListProps {
  name?: string;
  unit?: string;
  value?: string;
}

