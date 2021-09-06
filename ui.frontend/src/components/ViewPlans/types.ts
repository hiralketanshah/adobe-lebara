import {allowanceListProps} from "../PlanOffers/types"
export interface offerProps {
    cost?: string;
    validity?: string;
}

export interface PlanCardProps {
    offer?: offerProps; 
    allowanceList?: allowanceListProps;
    buttonLabel?: string;
    minutesField?: string;
    unlimitedTextField?: string;
}