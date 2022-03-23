import { MapTo } from "@adobe/aem-react-editable-components";
import ActivateSimOnly from "@lebara/ui/src/components/ActivateSimOnly/ActivateSimOnlyForm";

const ActivateSimOnlyConfig = {
  emptyLabel: "Activate Sim Only Form",
  isEmpty: function (props) {
    return true;
  },
};

MapTo("lebara/components/activatesimonly")(ActivateSimOnly, ActivateSimOnlyConfig);
