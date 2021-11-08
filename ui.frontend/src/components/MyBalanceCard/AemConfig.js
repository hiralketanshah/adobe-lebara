import { MapTo } from "@adobe/aem-react-editable-components";
import MyBalanceCard from "./MyBalanceCard";

const MyBalanceCardConfig = {
  emptyLabel: "My Balance Card component",
  isEmpty: function (props) {
    return true;
  },
};

MapTo("lebara/components/mybalancecard")(MyBalanceCard, MyBalanceCardConfig);