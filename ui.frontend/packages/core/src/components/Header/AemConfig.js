import { MapTo } from "@adobe/aem-react-editable-components";
import Header from "./Header";

const HeaderConfig = {
    emptyLabel: "Header",
    isEmpty: function (props) {
      return !props.items;
    },
};

MapTo("lebara/components/header/headernavigation")(Header, HeaderConfig);
