export interface OrderProps {
  type: string;
  name?: string;
  actualAmount: string;
  created: string;
  paymentMethod?: string;
  orderId: string;
}
export interface OrderFilterProps {
  isOpen: any;
  onClose: () => void;
  sims: Sim[];
  onSubmit(fromDate: Date, toDate: Date): void;
}

export interface ChooseSimProps {
  sims: Sim[];
}
export interface Sim {
  value?: string;
  key?: number;
  name?: string;
}
