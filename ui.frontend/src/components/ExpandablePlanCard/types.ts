import {CountriesList} from "../ExpandableSimPlanCard/types";

export interface ExpandablePlanCardProps {
    id?: number;
    planName?: string;
    price?: number;
    duration?: string;
    data?: string;
    minutesField?: string;
    isExpanded?: boolean;
    hideLabel?: string;
    showLabel?: string;
    buttonLabel?: string;
    offer?: PlanCardOffer;
    offerType?: string;
    unlimitedTextField?: string;
    allowanceList?: allowanceListProps[];
    onDetailsClick?: (id: number, status: boolean) => void;
}

export interface PlanCardOffer {
    planInfo?: planDetails;
    cost?: string;
    validity?: string;
}

export interface planDetails {
    listPlanItem?: string[];
    title?: string;
    countryList?: CountriesList[];
    countryTitle?: string;
}

export interface allowanceListProps {
    name?: string;
    unit?: string;
    value?: string;
    formatedValue?: string;
}

