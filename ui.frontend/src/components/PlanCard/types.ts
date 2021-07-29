export interface PlanCardItem {
    cost: string;
    validity: string;
    allowances: string;
}

export interface PlanCardProps {
    key?: number;
    price?: number | undefined;
    duration: string | undefined;
    description: string | undefined;
    data: string | undefined;
    color?: string | undefined;
    offers: PlanCardItem[];
    buttonLabel: string | "Buy Plan";
    minutesField: string;
    unlimitedTextField: string;
}

export interface Allowance {
    allowanceValue: number;
    account: Account;
}

export interface Account {
    name: string;
    unit: Unit;
}

export interface Unit {
    abbreviation: string
}