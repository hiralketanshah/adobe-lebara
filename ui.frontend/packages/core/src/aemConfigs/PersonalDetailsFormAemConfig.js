import { MapTo } from "@adobe/aem-react-editable-components";
import PersonalDetailsRoute from "@lebara/core/rotues/PersonalDetailsRoute";

const PersonalDetailsConfig = {
  emptyLabel: "Personal Details form",
  isEmpty: function (props) {
    return !props.heading;
  },
};

MapTo("lebara/components/personaldetails")(PersonalDetailsRoute, PersonalDetailsConfig);