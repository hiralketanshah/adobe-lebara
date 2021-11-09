import { MapTo } from "@adobe/aem-react-editable-components";
import SimSwitch from "./SimSwitch";

const SimSwitchConfig = {
  emptyLabel: "Sim Switch component",
  isEmpty: function (props) {
    return true;
  },
};

MapTo("lebara/components/simswitch")(SimSwitch, SimSwitchConfig);