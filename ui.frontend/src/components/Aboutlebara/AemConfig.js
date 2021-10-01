import { MapTo } from "@adobe/aem-react-editable-components";
import AboutLebara from "../AboutLebara";

const AboutLebaraConfig = {
  emptyLabel: "About Lebara",
  isEmpty: function (props) {
    return !props.title;
  },
};

MapTo("lebara/components/aboutlebara")(AboutLebara, AboutLebaraConfig);
