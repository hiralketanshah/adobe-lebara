import { CountriesListOption } from "../CountriesList/types";
import {ListPlanItem} from '../List/types'

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
  countryList?: CountriesListOption[];
  countryTitle?: string;
}

export interface allowanceListProps {
  name?: string;
  unit?: string;
  value?: string;
  formatedValue?: string;
}

