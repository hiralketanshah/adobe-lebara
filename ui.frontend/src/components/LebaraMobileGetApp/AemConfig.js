import { MapTo } from "@adobe/aem-react-editable-components";
import LebaraMobileGetApp from "./LebaraMobileGetApp";

const LebaraMobileGetAppConfig = {
  emptyLabel: "Lebara Mobile Get App Component",
  isEmpty: function (props) {
    return !props || !props.appTitle;
  },
};

MapTo("lebara/components/getapp")(LebaraMobileGetApp, LebaraMobileGetAppConfig);
