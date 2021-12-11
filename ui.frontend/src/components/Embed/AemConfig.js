import { MapTo } from "@adobe/aem-react-editable-components";
import Embed from "./Embed";

const EmbedConfig = {
  emptyLabel: "Embed Component",
  isEmpty: function (props) {
    return !props.type;
  },
};

MapTo("lebara/components/embed")(Embed, EmbedConfig);
