import { MapTo } from "@adobe/aem-react-editable-components";
import Help from ".";

const HelpConfig = {
    emptyLabel: "Help Center",
    isEmpty: function (props) {
      return !props.faqs;
    },
};

MapTo("lebara/components/help")(Help, HelpConfig);
