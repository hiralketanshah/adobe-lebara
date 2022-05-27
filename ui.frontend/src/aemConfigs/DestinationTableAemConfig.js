import { MapTo } from "@adobe/aem-react-editable-components";
import DestinationTable from "@lebara/ui/src/components/DestinationTable/DestinationTable";

const DestinationTableConfig = {
  emptyLabel: "Destination Table component",
  isEmpty: function (props) {
    return !props.title;
  },
};

MapTo("lebara/components/destinationtable")(DestinationTable, DestinationTableConfig);