import { MapTo } from "@adobe/aem-react-editable-components";
import Button from "../components/Button/Button";

const ButtonConfig = {
  emptyLabel: "Button Component",
  isEmpty: function (props) {
    return !props || !props.text;
  },
};

MapTo("lebara/components/button")(Button, ButtonConfig);
