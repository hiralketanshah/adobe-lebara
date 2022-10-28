import { MapTo } from "@adobe/aem-react-editable-components";
import PostpaidBillsRoute from "@lebara/core/routes/PostpaidBillsRoute";

const BillsOverviewConfig = {
  emptyLabel: "Dashboard - My Bills Overview",

  isEmpty: function (props) {
    return true;
  },
};

MapTo("lebara/components/dashboard/mybills")(PostpaidBillsRoute, BillsOverviewConfig);
