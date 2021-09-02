export interface offerProps {
    cost?: string;
    validity?: string;
}

export interface PlanCardProps {
    offer?: offerProps;
    buttonLabel?: string;
    minutesField?: string;
    unlimitedTextField?: string;
}