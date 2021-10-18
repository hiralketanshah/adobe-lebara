import { MapTo } from "@adobe/aem-react-editable-components";
import Search from "./Search";

const SearchConfig = {
  emptyLabel: "Quick Search",
  isEmpty: function (props) {
    return !props.title;
  },
};

MapTo("lebara/components/search")(Search, SearchConfig);
