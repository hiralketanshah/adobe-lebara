import { MapTo } from "@adobe/aem-react-editable-components";
import Selection from "@lebara/core/components/LebaraNetwork/LebaraNetwork";

const SelectionConfig = {
  emptyLabel: "Selection Component",
  isEmpty: function (props) {
    return true;
  },
};

MapTo("lebara/components/selection")(Selection, SelectionConfig);
