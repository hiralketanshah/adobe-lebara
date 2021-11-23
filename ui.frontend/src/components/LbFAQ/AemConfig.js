import { MapTo } from "@adobe/aem-react-editable-components";
import LbFAQ from "./index";

const LbFAQConfig = {
    emptyLabel: "Faq Component",
    isEmpty: function (props) {
      return !props.title;
    },
};

MapTo("lebara/components/helpcenter/faq")(LbFAQ, LbFAQConfig);
