import { CountriesListOption } from "../CountriesList/types";
import { allowanceListProps, planDetails } from "../ExpandablePlanCard/types";

export interface ExpandableSimPlanCardProps {
  planName: string;
  offerType?: string;
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
  viewCartLabel?: string;
  addedtoCartLabel?: string;
  buttonLabel?: string;
  productInformationFile?: string;
  showAddToCart?: boolean;
  promotionID?: string;
  promotionMessage?: string;
  promotionPrice?: string;
  promotionData?: string;
  ctaSelectLabel?: string;
  ctaAddToCartLabel?: string;
  ctaCloseLabel?: string;
  ctaDownloadLabel?: string;
  isRelatedPlan?: boolean;
  isRemoveFromCart?: boolean;
  onClose?: () => void;
}

const OfferTypes = {
  PREPAID: "prepaid",
  BOLTON: "bolton",
  POSTPAID: "postpaid",
  TOPUP: "topup"
}
export default  OfferTypes;

export interface CountriesList extends CountriesListOption {}
