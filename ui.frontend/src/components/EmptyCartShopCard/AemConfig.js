import { MapTo } from "@adobe/aem-react-editable-components";
import EmptyCartShopCard from "./EmptyCartShopCard";

const EmptyCartShopCardConfig = {
  emptyLabel: "Empty Cart Shop",
  isEmpty: function (props) {
    return !props.shopBuyLabel;
  },
};

MapTo("lebara/components/usp")(EmptyCartShopCard, EmptyCartShopCardConfig);
