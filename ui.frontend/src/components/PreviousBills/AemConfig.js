import { MapTo } from "@adobe/aem-react-editable-components";
import PreviousBills from "./PreviousBills";

const PreviousBillsConfig = {
  emptyLabel: "Dashboard - Previous Bills",

  isEmpty: function (props) {
    return !props || !props.dateLabel;
  },
};

MapTo("lebara/components/dashboard/previousbills")(PreviousBills, PreviousBillsConfig);
