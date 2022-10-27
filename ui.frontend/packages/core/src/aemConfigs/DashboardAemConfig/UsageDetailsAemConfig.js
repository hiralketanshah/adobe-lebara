import { MapTo } from "@adobe/aem-react-editable-components";
import UsageDetails from "@lebara/core/components/UsageDetails/UsageDetails";

const UsageDetailsConfig = {
  emptyLabel: "Usage Details component",
  isEmpty: function (props) {
    return true;
  },
};

MapTo("lebara/components/dashboard/usagedetails")(UsageDetails, UsageDetailsConfig);