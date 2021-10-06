
import { ExpandablePlanCardProps } from "../ExpandablePlanCard/types";

export interface PlanOffersProps {
  title?: string;
  heading?: string;
  subTitle?: string;
  description?: string;
  hideLabel?: string;
  minutesField?: string;
  showLabel?: string;
  ctaTopLink?: string;
  ctaTopLabel?: string;
  ctaBottomLink?: string;
  ctaBottomLabel?: string;
  offers?: ExpandablePlanCardProps[];
  unlimitedTextField?: string;
  allowanceList?: allowanceListProps;
  viewCartLabel?: string;
  addedtoCartLabel?: string;
  buttonLabel?: string;
}

export interface allowanceListProps {
  name?: string;
  unit?: string;
  value?: string;
  formatedValue?: string;
}

