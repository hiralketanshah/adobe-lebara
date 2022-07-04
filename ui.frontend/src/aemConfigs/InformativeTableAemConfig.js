import { MapTo } from "@adobe/aem-react-editable-components";
import InformativeTable from "@lebara/ui/src/components/InformativeTable/InformativeTable";
import "../styles/informativeTable.style.css";

const InformativeTableConfig = {
  emptyLabel: "Informative Table component",
  isEmpty: function (props) {
    return false;
  },
};

MapTo("lebara/components/informativetable")(InformativeTable, InformativeTableConfig);