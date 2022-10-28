import { MapTo } from "@adobe/aem-react-editable-components";
import MyBalanceCard from "@lebara/core/components/MyBalanceCard/MyBalanceCard"

const MyBalanceCardConfig = {
  emptyLabel: "My Balance Card component",
  isEmpty: function (props) {
    return true;
  },
};

MapTo("lebara/components/dashboard/mybalancecard")(MyBalanceCard, MyBalanceCardConfig);