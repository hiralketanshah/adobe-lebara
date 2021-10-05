import { MapTo } from "@adobe/aem-react-editable-components";
import AwardsShowCase from "./AwardsShowCase";


const AwardsShowCaseConfig = {
  emptyLabel: "Award Component",
  isEmpty: function (props) {
    return !props.title;
  },
};

MapTo("lebara/components/awards")(AwardsShowCase, AwardsShowCaseConfig);
