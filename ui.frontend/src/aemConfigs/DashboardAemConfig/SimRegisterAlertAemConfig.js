import { MapTo } from "@adobe/aem-react-editable-components";
import SimRegisterAlert from "@lebara/ui/src/layouts/SimRegisterAlert"

const SimRegisterAlertConfig = {
  emptyLabel: "Sim Register Alert component",
  isEmpty: function (props) {
    return true;
  },
};

MapTo("lebara/components/dashboard/simregisteralert")(SimRegisterAlert, SimRegisterAlertConfig);