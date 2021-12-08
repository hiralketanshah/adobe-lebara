import { MapTo } from "@adobe/aem-react-editable-components";
import AttachYourSim from "@lebara/ui/src/components/AttachYourSim/AttachYourSim";

const AttachYourSimConfig = {
  emptyLabel: "Manage Sim component",
  isEmpty: function (props) {
    return true;
  },
};

MapTo("lebara/components/dashboard/managesim")(AttachYourSim, AttachYourSimConfig);