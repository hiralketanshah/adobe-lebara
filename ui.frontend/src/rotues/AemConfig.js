import { MapTo } from "@adobe/aem-react-editable-components";
import SimPortInRoute from "./SimPortInRoute";
import OrderDetailsRoute from "./OrderDetailsRoute";
const SimPortInConfig = {
  emptyLabel: "Sim Port In Component",
  isEmpty: function (props) {
    return !props.title || !props.pretitle;
  },
};
const OrderDetailsConfig = {
  emptyLabel: "Order Details Component",
  isEmpty: function (props) {
    return !props;
  },
};
MapTo("lebara/components/simportin")(SimPortInRoute, SimPortInConfig);
MapTo("lebara/components/orderdetails")(OrderDetailsRoute, OrderDetailsConfig);
