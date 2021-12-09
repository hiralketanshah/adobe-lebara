import { BaseFormFields } from "../Formik/types";

export const CompDefaultBindings = {
  title: "Order and Payment History",
  shopNowCTA: "SHOP NOW",
  emptyOrderLabel: "Looks like you haven’t made any orders yet",
  orderHistoryEmptyLabel: "Your order history is Empty",
  monthLabel: "Months",
  transactionSummery: "Get a summary of all your transactions !",
  numberHistoryLabel: "015171918893",
  historyLabel: "History",
  cancelCTALabel: "CANCEL",
  continueCTALabel: "CONTINUE",
  mobileNumberPlaceholder: "015171918893",
  mobileNumberLabel: "Mobile Number",
  toLabel: "To",
  fromLabel: "From",
  modalTitle: "Transaction Filter",
  filterLabel: "FILTER"
}
export interface FormFields extends BaseFormFields {
  shopNowCTA?: string;
  emptyOrderLabel?: string;
  orderHistoryEmptyLabel?: string;
  monthLabel?: string;
  transactionSummery?: string;
  numberHistoryLabel?: string;
  historyLabel?: string;
  cancelCTALabel?: string;
  continueCTALabel?: string;
  mobileNumberPlaceholder?: string;
  mobileNumberLabel?: string;
  toLabel?: string;
  fromLabel?: string;
  modalTitle?: string;
  filterLabel?: string;
  nodataImage?: string;
}
export interface OrderProps {
  title?: string;
  type: string;
  name?: string;
  actualAmount: string;
  created: string;
  paymentMethod?: string;
  orderId: string;
  frmFields?: FormFields;
}
export interface OrderFilterProps {
  isOpen: any;
  onClose: () => void;
  sims: Sim[];
  onSubmit(fromDate: Date, toDate: Date): void;
  frmFields?: FormFields;
}

export interface ChooseSimProps {
  sims: Sim[];
  frmFields?: FormFields;
}
export interface Sim {
  value?: string;
  key?: number;
  name?: string;
}
