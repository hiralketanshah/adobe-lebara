import { MapTo } from "@adobe/aem-react-editable-components";
import InternationalRates from "@lebara/core/components/InternationalRates/InternationalRates";

const InternationalRatesConfig = {
    emptyLabel: "International Rates",
    isEmpty: function (props) {
      return !props || !props.description;
    },
};

MapTo("lebara/components/internationalrates")(InternationalRates, InternationalRatesConfig);
