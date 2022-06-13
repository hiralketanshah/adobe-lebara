import { MapTo } from "@adobe/aem-react-editable-components";
import SimDetails from "@lebara/ui/src/components/SimDetails/SimDetails";

const SimDetailsConfig = {
  emptyLabel: "Legal Registration Sim Details",
  isEmpty: function (props) {
    return true;
  },
};

MapTo("lebara/components/simdetails")(SimDetails, SimDetailsConfig);
