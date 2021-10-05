import { MapTo } from "@adobe/aem-react-editable-components";
import PostpaidPlans from "./PostpaidPlans";

const PostpaidPlansConfig = {
  emptyLabel: "PostpaidPlans",
  isEmpty: function (props) {
    return !props.durationTitle;
  },
};

MapTo("lebara/components/postpaidPlans")(PostpaidPlans, PostpaidPlansConfig);
