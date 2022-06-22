import { MapTo } from "@adobe/aem-react-editable-components";
import InformativeTable from "@lebara/ui/src/components/InformativeTable/InformativeTable";

const InformativeTableConfig = {
  emptyLabel: "Informative Table component",
  isEmpty: function (props) {
    return false;
  },
};

MapTo("lebara/components/informativetable")(InformativeTable, InformativeTableConfig);