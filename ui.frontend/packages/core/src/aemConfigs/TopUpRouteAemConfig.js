import { MapTo } from "@adobe/aem-react-editable-components";
import TopupRoute from "@lebara/core/routes/TopupRoute";

const TopupRouteConfig = {
  emptyLabel: "Top Up Component",
  isEmpty: function (props) {
    return ( !props.leftTitle || !props.rightTitle );
  },
};

MapTo("lebara/components/topup")(TopupRoute, TopupRouteConfig);
