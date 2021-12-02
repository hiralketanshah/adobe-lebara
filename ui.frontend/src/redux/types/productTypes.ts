import {
  PlanDurationProps,
  SelectedPlanProps,
} from "../../components/NewPostpaidNumber/types";

export interface SelectedProduct {
  id?: string;
  product: string;
  isPostPaid?: boolean;
  planValues?: PlanDurationProps;
  selectedPlan?: SelectedPlanProps;
}
