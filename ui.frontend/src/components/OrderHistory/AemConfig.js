import { MapTo } from "@adobe/aem-react-editable-components";
import OrderHistoryContainer from "./OrderHistoryContainer";

const OrderHistoryContainerConfig = {
  emptyLabel: "Postpaid Component",
  isEmpty: function (props) {
    return true;
  },
};

MapTo("lebara/components/orderpaymenthistory")(OrderHistoryContainer, OrderHistoryContainerConfig);
