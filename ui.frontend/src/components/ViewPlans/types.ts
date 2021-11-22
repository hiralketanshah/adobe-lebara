import {allowanceListProps} from "../PlanOffers/types";


export interface offerProps {
    id?: number;
    offerType?: string;
    cost?: string;
    planName?: string;
    validity?: string;
    validityText?: string;
    dataVolumeText?: string;
    minutesToCountriesText?: string;
    planInfo?: {}; //To check with nps on this
    additionalOffers?: string;
    allowanceList?: allowanceListProps[];
}

export interface PlanCardProps {
    offer?: offerProps; 
    buttonLabel?: string;
    minutesField?: string;
    unlimitedTextField?: string;
}