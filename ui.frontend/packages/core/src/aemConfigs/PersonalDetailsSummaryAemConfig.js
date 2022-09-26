import { MapTo } from "@adobe/aem-react-editable-components";
import PersonalDetailsSummary from "@lebara/netherlands/components/PersonalDetailsSummary/PersonalDetailsSummary";

const PersonalDetailsConfig = {
  emptyLabel: "Personal Details Summary",
  isEmpty: function (props) {
    return !props.personalDetailsLabel;
  },
};

MapTo("lebara/components/personaldetailssummary")(PersonalDetailsSummary, PersonalDetailsConfig);
