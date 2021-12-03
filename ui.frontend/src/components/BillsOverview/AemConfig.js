import { MapTo } from "@adobe/aem-react-editable-components";
import BillsContainer from "./BillsContainer";

const BillsOverviewConfig = {
  emptyLabel: "Dashboard - My Bills Overview",

  isEmpty: function (props) {
    return true;
  },
};

MapTo("lebara/components/dashboard/mybills")(BillsContainer, BillsOverviewConfig);
