import { MapTo } from "@adobe/aem-react-editable-components";
import PostpaidPlans from "./PostpaidPlans";

const PostpaidPlansConfig = {
    emptyLabel: "FAQ",
    isEmpty: function (props) {
      return !props.title;
    },
};

MapTo("lebara/components/faq")(PostpaidPlans, PostpaidPlansConfig);
