import { MapTo } from "@adobe/aem-react-editable-components";
import GenericButton from "@lebara/core/components/GenericButton/GenericButton";

const ButtonConfig = {
  emptyLabel: "Button Component",
  isEmpty: function (props) {
    return !props || !props.text;
  },
};

MapTo("lebara/components/button")(GenericButton, ButtonConfig);
