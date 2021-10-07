import { MapTo } from "@adobe/aem-react-editable-components";
import TopupRoute from "./TopupRoute";

const TopupRouteConfig = {
  emptyLabel: "Top Up",
  isEmpty: function (props) {
    return ( !props.leftTitle || !props.rightTitle );
  },
};

MapTo("lebara/components/usp")(TopupRoute, TopupRouteConfig);
