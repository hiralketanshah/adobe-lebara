
import { ExpandablePlanCardProps } from "../ExpandablePlanCard/types";

export interface PlanOffersProps {
  title?: string;
  heading?: string;
  subTitle?: string;
  description?: string;
  hideLabel?: string;
  showLabel?: string;
  ctaTopLink?: string;
  ctaTopLabel?: string;
  ctaBottomLink?: string;
  ctaBottomLabel?: string;
  offers?: ExpandablePlanCardProps[];
  allowanceList?: allowanceListProps;
  viewCartLabel?: string;
  addedtoCartLabel?: string;
  buttonLabel?: string;
  backgroundColor?: string;
  productInformationButtonLabel?: string;
  ctaAddToCartLabel?: string;
  ctaSelectLabel?: string;
  ctaCloseLabel?: string;
  ctaDownloadLabel?: string;
  minutesLabel?: string;
  noPadding?: string;
  textAlignment?: string;
  columnsView?: number;
  labelTextColor?: string;
  showModelOnAddtoCart ?: boolean;
}

export interface allowanceListProps {
  name?: string;
  unit?: string;
  value?: string;
  formatedValue?: string;
}

