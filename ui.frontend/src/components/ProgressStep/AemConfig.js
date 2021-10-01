import { MapTo } from "@adobe/aem-react-editable-components";
import ProgressStep from "./ProgressStep";

const ProgressStepConfig = {
  emptyLabel: "Progress Step Links",
  isEmpty: function (props) {
    return !props.pageLinks?.length;
  },
};

MapTo("lebara/components/faq")(ProgressStep, ProgressStepConfig);
