import { MapTo } from "@adobe/aem-react-editable-components";
import PostpaidPersonalDetailsRoute from "./PostpaidPersonalDetailsRoute";

const PostpaidPersonalDetailsConfig = {
  emptyLabel: "Postpaid Personal Details component",
  isEmpty: function (props) {
    return !props.heading;
  },
};

MapTo("lebara/components/personaldetails")(PostpaidPersonalDetailsRoute, PostpaidPersonalDetailsConfig);
// MapTo("lebara/components/postpaidpersonaldetails")(PostpaidPersonalDetailsRoute, PostpaidPersonalDetailsConfig);
