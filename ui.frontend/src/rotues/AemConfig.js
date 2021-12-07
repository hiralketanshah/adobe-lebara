import { MapTo } from "@adobe/aem-react-editable-components";
import OrderDetailsRoute from "@lebara/ui/src/rotues/OrderDetailsRoute";
import SimPortInRoute from "@lebara/ui/src/rotues/SimPortInRoute";

const SimPortInConfig = {
  emptyLabel: "Sim Port In Component",
  isEmpty: function (props) {
    return !props.title || !props.pretitle;
  },
};
const OrderDetailsConfig = {
  emptyLabel: "Order Details Component",
  isEmpty: function (props) {
    return !props.selectedProductLabel;
  },
};
MapTo("lebara/components/simportin")(SimPortInRoute, SimPortInConfig);
MapTo("lebara/components/orderdetails")(OrderDetailsRoute, OrderDetailsConfig);
