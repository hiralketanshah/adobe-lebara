import { MapTo } from "@adobe/aem-react-editable-components";
import UsageDetails from "./UsageDetails";

const UsageDetailsConfig = {
  emptyLabel: "Usage Details component",
  isEmpty: function (props) {
    return !props.phoneCallDetails?.length;
  },
};

MapTo("lebara/components/usagedetails")(UsageDetails, UsageDetailsConfig);