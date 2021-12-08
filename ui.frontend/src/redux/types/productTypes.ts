export interface SelectedProduct {
  id?: string;
  product: string;
  isPostPaid?: boolean;
  planValues?: PlanDurationProps;
  selectedPlan?: SelectedPlanProps;
}

export interface PlanDurationProps {
  data: number;
  minutes: number;
  planDuration: string;
}
export interface SelectedPlanProps {
  offerId: number;
  name: string;
  cost: number;
}
