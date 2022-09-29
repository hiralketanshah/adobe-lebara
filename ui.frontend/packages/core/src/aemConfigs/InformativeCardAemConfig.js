import { MapTo } from "@adobe/aem-react-editable-components";
import SimPurchaseSupport from "@lebara/netherlands/components/SimPurchaseSupport/SimPurchaseSupport";

const InformativeCardConfig = {
    emptyLabel: "Informative Card Component",
    isEmpty: function (props) {
      return !props || !props.heading;
    }
};

MapTo("lebara/components/informativecard")(SimPurchaseSupport, InformativeCardConfig);