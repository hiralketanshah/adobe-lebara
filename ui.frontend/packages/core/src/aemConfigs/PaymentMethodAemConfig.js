import { MapTo } from "@adobe/aem-react-editable-components";
import PaymentMethodRoute from "@lebara/core/routes/PaymentMethodRoute";

const PaymentMethodConfig = {
  emptyLabel: "Payment Method component",
  isEmpty: function (props) {
    return !props.preferredPaymentLabel;
  },
};

MapTo("lebara/components/user/paymentmethod")(PaymentMethodRoute, PaymentMethodConfig);