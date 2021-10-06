import { CountriesListOption } from "../CountriesList/types";
import { allowanceListProps, PlanCardOffer, planDetails } from "../ExpandablePlanCard/types";

export interface ExpandableSimPlanCardProps {
  planName: string;
  price: number;
  duration: string;
  countries: CountriesList[];
  previewIcon?: JSX.Element;
  previewItems?: JSX.Element[];
  showProductInformationButton?: boolean;
  productInformationButtonLabel?: string;
  detailsPreviewItems?: JSX.Element[];
  allowance?: string;
  onActionClick?: () => void;
  allowanceList?: allowanceListProps[];
  validity?: string;
  cost?: string;
  showLabel?: string;
  planInfo?: planDetails;
  additionalOffers?: string;
  id?: string;
  isAddtoCart?: boolean;
  viewCartLabel?: string;
  addedtoCartLabel?: string;
  buyPlanLabel?: string;
  addtoCartLabel?: string;
}

export interface CountriesList extends CountriesListOption {}
