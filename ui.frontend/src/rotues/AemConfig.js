import { MapTo } from "@adobe/aem-react-editable-components";
import OrderDetailsRoute from "@lebara/ui/src/rotues/OrderDetailsRoute";
import SimPortInRoute from "@lebara/ui/src/rotues/SimPortInRoute";
import aemUtils from "../utils/aem-utils";
const SimPortInConfig = {
  emptyLabel: "Sim Port In Component",
  isEmpty: function (props) {
    return !props.title || !props.pretitle;
  },
};
const FRSimPortInConfig = {
  emptyLabel: " FR Sim Port In Component",
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
const componentwithofferDataProp=(props)=> <OrderDetailsRoute {...props} fetchDataCallback={(id, isOneEntry, isPromotion)=> aemUtils.fetchData(id, isOneEntry, isPromotion)}/>;
MapTo("lebara/components/simportin")(SimPortInRoute, SimPortInConfig);
const componentwithProp=(props)=> <SimPortInRoute {...props} showRIOCodeForm />
MapTo("lebara/components/frsimportin")(componentwithProp, FRSimPortInConfig);
MapTo("lebara/components/orderdetails")(componentwithofferDataProp, OrderDetailsConfig);
