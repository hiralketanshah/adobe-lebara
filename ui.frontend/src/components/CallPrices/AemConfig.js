import { MapTo } from "@adobe/aem-react-editable-components";
import CallPrices from "./CallPrices";

const CallPricesConfig = {
  emptyLabel: "Where To Call",
  isEmpty: function (props) {
    return !props.title;
  },
};

MapTo("lebara/components/wheretocall")(CallPrices, CallPricesConfig);
