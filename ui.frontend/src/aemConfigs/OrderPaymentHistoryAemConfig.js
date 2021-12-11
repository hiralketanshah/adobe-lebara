import { MapTo } from "@adobe/aem-react-editable-components";
import OrderHistoryContainer from "@lebara/ui/src/components/OrderHistory/OrderHistoryContainer";

const OrderHistoryContainerConfig = {
  emptyLabel: "Order History Component",
  isEmpty: function (props) {
    return !props || !props.title;
  },
};

MapTo("lebara/components/orderpaymenthistory")(OrderHistoryContainer, OrderHistoryContainerConfig);