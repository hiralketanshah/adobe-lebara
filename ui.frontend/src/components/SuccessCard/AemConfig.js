import { MapTo } from "@adobe/aem-react-editable-components";
import SuccessCard from "./SuccessCard";

const SuccessCardConfig = {
  emptyLabel: "Order Confirmation",
  isEmpty: function (props) {
    return !props.title;
  },
};

MapTo("lebara/components/usp")(SuccessCard, SuccessCardConfig);
