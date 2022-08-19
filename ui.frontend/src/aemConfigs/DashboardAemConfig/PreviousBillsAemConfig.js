import { MapTo } from "@adobe/aem-react-editable-components";
import PreviousBills from "@lebara/core/components/PreviousBills/PreviousBills";

const PreviousBillsConfig = {
  emptyLabel: "Dashboard - Previous Bills",

  isEmpty: function () {
    return true;
  },
};

MapTo("lebara/components/dashboard/previousbills")(PreviousBills, PreviousBillsConfig);
