import { MapTo } from "@adobe/aem-react-editable-components";
import PaymentSummary from "@lebara/netherlands/components/PaymentSummary/PaymentSummary";

const PaymentSummaryConfig = {
  emptyLabel: "Payment Summary",
  isEmpty: function (props) {
    return !props.paymentMethodLabel;
  },
};

MapTo("lebara/components/nl/paymentsummary")(PaymentSummary, PaymentSummaryConfig);
