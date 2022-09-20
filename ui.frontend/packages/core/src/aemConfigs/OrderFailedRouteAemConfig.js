import { MapTo } from "@adobe/aem-react-editable-components";
import FailedOrderRoute from "@lebara/core/rotues/FailedOrderRoute";

const OrderFailedRouteAemConfig = {
  emptyLabel: "Order Failed",
  isEmpty: function (props) {
    return !props.errorMessage;
  },
};

MapTo("lebara/components/failedorder")(FailedOrderRoute, OrderFailedRouteAemConfig);
