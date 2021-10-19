import { CountriesListOption } from "../CountriesList/types";
import { ExpandableSimPlanCardProps } from "../ExpandableSimPlanCard/types";

export interface EmptyCartShopCardProps {
  expandableAddOnsCardProps: ExpandableSimPlanCardProps;
  expandablePlanCardProps: ExpandableSimPlanCardProps;
  expandableSimPlanCardProps: ExpandableSimPlanCardProps;
  shopBuyLabel?: string;
  cartDescription?: string;
  addOnTabLabel?: string;
  dataTabLabel?: string;
  plansTabLabel?: string;
}

export interface CountriesList extends CountriesListOption {}
