import { MapTo } from "@adobe/aem-react-editable-components";
import Search from "./Search";

const SearchBoxConfig = {
  emptyLabel: "Search Component",
  isEmpty: function (props) {
    return !props.searchPlaceholder;
  },
};

MapTo("lebara/components/search")(Search, SearchBoxConfig);
