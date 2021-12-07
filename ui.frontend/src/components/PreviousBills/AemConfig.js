import { MapTo } from "@adobe/aem-react-editable-components";
import PreviousBillsContainer from "./PreviousBillsContainer";

const PreviousBillsConfig = {
  emptyLabel: "Dashboard - Previous Bills",

  isEmpty: function () {
    return true;
  },
};

MapTo("lebara/components/dashboard/previousbills")(PreviousBillsContainer, PreviousBillsConfig);
