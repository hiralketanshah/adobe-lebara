import { MapTo } from "@adobe/aem-react-editable-components";
import Teaser from "./Teaser";

const TeaserEditConfig = {
  emptyLabel: "Teaser",

  isEmpty: function (props) {
    return !props || !props.title || !props.description;
  },
};

MapTo("lebara/components/teaser")(Teaser, TeaserEditConfig);
