import { MapTo } from "@adobe/aem-react-editable-components";
import AttachSimModels from "@lebara/ui/src/components/AttachSim/AttachSimModels";

const AttachSimModelConfig = {
  emptyLabel: "Attach Sim Model Component",
  isEmpty: function (props) {
    return true;
  },
};

MapTo("lebara/components/dashboard/attachsimpopup")(AttachSimModels, AttachSimModelConfig);