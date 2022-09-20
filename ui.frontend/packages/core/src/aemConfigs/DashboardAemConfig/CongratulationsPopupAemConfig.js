import { MapTo } from "@adobe/aem-react-editable-components";
import CongratulationsPopUp from "@lebara/core/components/CongratulationsPopUp/CongratulationsPopUp";

const CongratulationsPopupConfig = {
  emptyLabel: "Congratulations Popup component",
  isEmpty: function (props) {
    return true;
  },
};

MapTo("lebara/components/dashboard/congratulationspopup")(CongratulationsPopUp, CongratulationsPopupConfig);