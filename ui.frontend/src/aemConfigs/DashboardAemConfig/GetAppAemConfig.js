import { MapTo } from "@adobe/aem-react-editable-components";
import LebaraMobileGetApp from "@lebara/core/components/LebaraMobileApp/LebaraMobileApp";

const LebaraMobileGetAppConfig = {
  emptyLabel: "Get APP",
  isEmpty: function (props) {
    return !props.appTitle;
  },
};

MapTo("lebara/components/getapp")(LebaraMobileGetApp, LebaraMobileGetAppConfig);