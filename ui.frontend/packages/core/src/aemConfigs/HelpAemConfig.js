import { MapTo } from "@adobe/aem-react-editable-components";
import Help from "@lebara/core/components/Help/Help";

const HelpConfig = {
    emptyLabel: "Help Center",
    isEmpty: function (props) {
      return !props.faqs;
    },
};

MapTo("lebara/components/help")(Help, HelpConfig);
