import { MapTo } from "@adobe/aem-react-editable-components";
import Selection from "@lebara/core/rotues/FailedLegalRegistration";
const SelectionConfig = {
  emptyLabel: "Failed Legal Registration Component",
  isEmpty: function (props) {
    return true;
  },
};

MapTo("lebara/components/failedlegalregistration")(Selection, SelectionConfig);
