import { MapTo } from "@adobe/aem-react-editable-components";
import PersonalDetailsRoute from "./PersonalDetailsRoute";

const PostpaidPersonalDetailsConfig = {
  emptyLabel: "Postpaid Personal Details component",
  isEmpty: function (props) {
    return !props.heading;
  },
};

MapTo("lebara/components/postpaidpersonaldetails")(PersonalDetailsRoute, PostpaidPersonalDetailsConfig);
