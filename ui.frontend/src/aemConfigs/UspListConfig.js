import { MapTo } from "@adobe/aem-react-editable-components";
import USPList from "@lebara/ui/src/components/USP/USPList/USPList";

const USPListConfig = {
  emptyLabel: "USP List Component",
  isEmpty: function (props) {
    return true;
  },
};

MapTo("lebara/components/usplist")(USPList, USPListConfig);
