import { MapTo } from "@adobe/aem-react-editable-components";
import EmptyCartRoute from "@lebara/ui/src/rotues/EmptyCartRoute";

const EmptyCartRouteConfig = {
  emptyLabel: "Empty Cart Shop",
  isEmpty: function (props) {
    return !props.shopBuyLabel;
  },
};

MapTo("lebara/components/emptycart")(EmptyCartRoute, EmptyCartRouteConfig);
