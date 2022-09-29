import { MapTo } from "@adobe/aem-react-editable-components";
import PostpaidPersonalDetails from "@lebara/core/components/PostpaidPersonalDetails/PostpaidPersonalDetails";
const PostpaidPersonalDetailsConfig = {
  emptyLabel: "Postpaid Buy Personal Details component",
  isEmpty: function (props) {
    return !props.heading;
  },
};

MapTo("lebara/components/postpaidbuypersonaldetails")(PostpaidPersonalDetails, PostpaidPersonalDetailsConfig);
