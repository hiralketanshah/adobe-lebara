import { MapTo } from "@adobe/aem-react-editable-components";
import SimPortInRoute from "./SimPortInRoute";

const SimPortInConfig = {
  emptyLabel: "Sim Port In Component",
  isEmpty: function (props) {
    return !props.title || !props.pretitle;
  },
}

MapTo("lebara/components/simportin")(SimPortInRoute, SimPortInConfig);
