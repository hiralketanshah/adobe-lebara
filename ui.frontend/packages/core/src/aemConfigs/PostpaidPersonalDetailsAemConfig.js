import { MapTo } from "@adobe/aem-react-editable-components";
import PostpaidDetailsRoute from "@lebara/core/rotues/PostpaidDetailsRoute";

const PostpaidPersonalDetailsConfig = {
  emptyLabel: "Postpaid Personal Details component",
  isEmpty: function (props) {
    return !props.heading;
  },
};

MapTo("lebara/components/postpaidpersonaldetails")(PostpaidDetailsRoute, PostpaidPersonalDetailsConfig);
