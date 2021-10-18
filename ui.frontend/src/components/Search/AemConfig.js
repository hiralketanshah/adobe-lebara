import { MapTo } from "@adobe/aem-react-editable-components";
import Search from "./Search";

const SearchConfig = {
  emptyLabel: "Search Component",
  isEmpty: function (props) {
    return !props.searchRoot;
  },
};

MapTo("lebara/components/search")(Search, SearchConfig);
