import { MapTo } from "@adobe/aem-react-editable-components";
import UsageDetails from "./UsageDetails";

const UsageDetailsConfig = {
  emptyLabel: "Usage Details component",
  isEmpty: function (props) {
    return true;
  },
};

MapTo("lebara/components/dashboard/usagedetails")(UsageDetails, UsageDetailsConfig);