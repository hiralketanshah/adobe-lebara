import { ExpandablePlanCardProps } from "../ExpandablePlanCard/types";
import {allowanceListProps} from "../PlanOffers/types";


export interface OfferProps extends ExpandablePlanCardProps {
    id?: number;
    offerType?: string;
    cost?: string;
    planName?: string;
    validity?: string;
    validityText?: string;
    dataVolumeText?: string;
    minutesToCountriesText?: string;
    additionalOffers?: string;
    allowanceList?: allowanceListProps[];
}

export interface PlanCardProps {
    offers?: OfferProps; 
    buttonLabel?: string;
    productInformationButtonLabel?: string;
    ctaAddToCartLabel?: string;
    ctaSelectLabel?: string;
    ctaCloseLabel?: string;
    ctaDownloadLabel?: string;
    exploreAllLabel?: string;
    exploreAllLink?: string;
}