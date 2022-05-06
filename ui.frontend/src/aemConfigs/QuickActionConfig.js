import { MapTo } from "@adobe/aem-react-editable-components";
import Selection from "@lebara/ui/src/components/LebaraNetwork/LebaraNetwork";

const QuickActionConfig = {
  emptyLabel: "Quick Action Component",
  isEmpty: function (props) {
    return true;
  },
};

MapTo("lebara/components/quickaction")(Selection, QuickActionConfig);
