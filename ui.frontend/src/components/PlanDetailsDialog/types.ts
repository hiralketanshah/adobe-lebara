import {CountriesList} from "../ExpandableSimPlanCard/types";

export interface PlanDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  price: number;
  duration: string;
  previewIcon?: JSX.Element;
  previewItems?: string[];
  countries: CountriesList[];
  buttonText?: string;
  onActionClick?: () => void;
  isButtonDisabled?: boolean;
  title?: string;
  countryTitle?: string;
  dataValue?: string;
  hideButton?: boolean;
  isLoading?: boolean;
}
