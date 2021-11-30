import { MapTo } from "@adobe/aem-react-editable-components";
import BillsOverview from "./BillsOverview";

const BillsOverviewConfig = {
  emptyLabel: "Dashboard - My Bills Overview",

  isEmpty: function (props) {
    return !props || !props.title;
  },
};

MapTo("lebara/components/dashboard/mybills")(BillsOverview, BillsOverviewConfig);
