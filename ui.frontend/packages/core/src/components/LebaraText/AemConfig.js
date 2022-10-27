import { MapTo } from "@adobe/aem-react-editable-components";
import LebaraText from "./LebaraText";

const LebaraTextConfig = {
  emptyLabel: "Title",
  isEmpty: function (props) {
    return !props || !props.text;
  },
};

MapTo("lebara/components/title")(LebaraText, LebaraTextConfig);
