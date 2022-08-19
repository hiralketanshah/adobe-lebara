import { MapTo } from "@adobe/aem-react-editable-components";
import QuickActionButtons from "@lebara/core/components/QuickActionButtons/QuickActionButtons";

const QuickActionConfig = {
  emptyLabel: "Quick Action Component",
  isEmpty: function (props) {
    return true;
  },
};

MapTo("lebara/components/quickaction")(QuickActionButtons, QuickActionConfig);
