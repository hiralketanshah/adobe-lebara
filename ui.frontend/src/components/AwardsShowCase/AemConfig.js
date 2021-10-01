import { MapTo } from "@adobe/aem-react-editable-components";
import AwardsShowCase from "./AwardsShowCase";

const AwardsShowCaseConfig = {
    emptyLabel: "FAQ",
    isEmpty: function (props) {
      return !props.title;
    },
};

MapTo("lebara/components/faq")(AwardsShowCase, AwardsShowCaseConfig);
