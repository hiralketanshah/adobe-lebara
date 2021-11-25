import { MapTo } from "@adobe/aem-react-editable-components";
import Help from "./Help";

const HelpConfig = {
    emptyLabel: "Help Center",
    isEmpty: function (props) {
      return !props.faqs;
    },
};

MapTo("lebara/components/help")(Help, HelpConfig);
