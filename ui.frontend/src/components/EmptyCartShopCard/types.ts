import { CountriesListOption } from "@lebara/ui/src/components/CountriesList/types";
import { ExpandableSimPlanCardProps } from "../ExpandableSimPlanCard/types";

export interface EmptyCartShopCardProps {
  expandableAddOnsCardProps: ExpandableSimPlanCardProps[];
  expandablePlanCardProps: ExpandableSimPlanCardProps[];
  expandableSimPlanCardProps: ExpandableSimPlanCardProps[];
  shopBuyLabel?: string;
  cartDescription?: string;
  addOnTabLabel?: string;
  dataTabLabel?: string;
  plansTabLabel?: string;
  showDetailsLabel?: string;
  buyPlanLabel?: string;
  continueBrowsingLabel?: string;
  emptyBasketText?: string;
  goBackText?: string;
  addToCartLabel?: string;
  continueBrowsinglink?: string;
  fullWidth?: boolean;
  viewCartLabel?: string;
  addedtoCartLabel?: string;
  showModelOnAddtoCart?: boolean;
}

export interface CountriesList extends CountriesListOption {}
