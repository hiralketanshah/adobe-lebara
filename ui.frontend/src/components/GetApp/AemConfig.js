import { MapTo } from "@adobe/aem-react-editable-components";
import LebaraMobileGetApp from "./LebaraMobileGetApp";

const LebaraMobileGetAppConfig = {
  emptyLabel: "Get APP",
  isEmpty: function (props) {
    return !props.appTitle;
  },
};

MapTo("lebara/components/getapp")(LebaraMobileGetApp, LebaraMobileGetAppConfig);