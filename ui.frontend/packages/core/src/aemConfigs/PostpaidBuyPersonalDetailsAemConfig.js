import { MapTo } from "@adobe/aem-react-editable-components";
import PostpaidBuyPlanDetails from "@lebara/netherlands/pages/PostpaidBuyPlanDetails";
const PostpaidPersonalDetailsConfig = {
  emptyLabel: "Postpaid Buy Personal Details component",
  isEmpty: function (props) {
    return !props.heading;
  },
};

MapTo("lebara/components/postpaidbuypersonaldetails")(PostpaidBuyPlanDetails, PostpaidPersonalDetailsConfig);
