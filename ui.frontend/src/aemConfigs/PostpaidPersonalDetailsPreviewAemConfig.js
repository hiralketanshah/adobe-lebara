import { MapTo } from "@adobe/aem-react-editable-components";
import PostpaidPersonalDetailsPreview from "@lebara/ui/src/components/PostpaidPersonalDetailsPreview/PostpaidPersonalDetailsPreview";

const PostpaidPersonalDetailsPreviewConfig = {
  emptyLabel: "Postpaid Personal Details Preview component",
  isEmpty: function (props) {
    return !props.heading;
  },
};

MapTo("lebara/components/postpaidpersonaldetailspreview")(PostpaidPersonalDetailsPreview, PostpaidPersonalDetailsPreviewConfig);
