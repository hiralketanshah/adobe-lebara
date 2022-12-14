import { MapTo } from "@adobe/aem-react-editable-components";
import PaymentOrderHistoryRoute from "@lebara/core/routes/PaymentOrderHistoryRoute";

const OrderHistoryContainerConfig = {
  emptyLabel: "Order History Component",
  isEmpty: function (props) {
    return !props || !props.title;
  },
};

MapTo("lebara/components/orderpaymenthistory")(PaymentOrderHistoryRoute, OrderHistoryContainerConfig);
