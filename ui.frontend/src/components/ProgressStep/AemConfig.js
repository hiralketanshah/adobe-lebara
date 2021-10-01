import { MapTo } from "@adobe/aem-react-editable-components";
import ProgressStep from "./ProgressStep";

const ProgressStepConfig = {
    emptyLabel: "FAQ",
    isEmpty: function (props) {
      return !props.title;
    },
};

MapTo("lebara/components/faq")(ProgressStep, ProgressStepConfig);
