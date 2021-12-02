import { MapTo } from "@adobe/aem-react-editable-components";
import LbIntro from "./index";

const LbIntroConfig = {
  emptyLabel: "Intro Component",
  isEmpty: function (props) {
    return !props || !props.heading;
  },
};

MapTo("lebara/components/intro")(LbIntro, LbIntroConfig);
