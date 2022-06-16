import { MapTo } from "@adobe/aem-react-editable-components";
import DelinkSuccessMessage from "@lebara/ui/src/components/DLinkSim/DelinkSuccessMessage";
const SuccessPopupConfig = {
  emptyLabel: "Success Popup",
  isEmpty: function (props) {
    return !props.message;
  },
};

MapTo("lebara/components/successpopup")(DelinkSuccessMessage, SuccessPopupConfig);
