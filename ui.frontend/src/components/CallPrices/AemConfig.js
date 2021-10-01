import { MapTo } from "@adobe/aem-react-editable-components";
import CallPrices from "./CallPrices";

const CallPricesConfig = {
    emptyLabel: "FAQ",
    isEmpty: function (props) {
      return !props.title;
    },
};

MapTo("lebara/components/faq")(CallPrices, CallPricesConfig);
