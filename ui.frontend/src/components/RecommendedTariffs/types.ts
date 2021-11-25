import { OfferProps, PlanCardProps } from "../ViewPlans/types";
interface RecommendedOffersProps {
    additionalOffers: string;
    allowanceList: [];
    cost: string;
    id: string;
    offerType: string;
    planName: string;
    productInformationFile: string;​​​         
    validity: string;
    recommendedImage?: string;
    recommendedURL?:string;
}
export interface RecommendedTariffsProps extends RecommendedOffersProps {
    buttonLabel?: string;
    offers?: RecommendedOffersProps[];
}