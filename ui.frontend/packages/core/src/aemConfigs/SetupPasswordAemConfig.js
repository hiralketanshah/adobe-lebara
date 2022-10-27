import { MapTo } from "@adobe/aem-react-editable-components";
import SetupPassword from "@lebara/netherlands/components/SetupPassword/SetupPassword"

const SetupPasswordConfig = {
  emptyLabel: "Setup Password component",
  isEmpty: function (props) {
    return !props.compHeading;
  },
};

MapTo("lebara/components/nl/setuppassword")(SetupPassword, SetupPasswordConfig);