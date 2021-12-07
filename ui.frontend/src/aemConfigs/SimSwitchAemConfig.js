import { MapTo } from "@adobe/aem-react-editable-components";
import SimSwitch from "@lebara/ui/src/components/SimSwitch/SimSwitch";

const SimSwitchConfig = {
  emptyLabel: "Sim Switch component",
  isEmpty: function (props) {
    return true;
  },
};

MapTo("lebara/components/dashboard/simswitch")(SimSwitch, SimSwitchConfig);