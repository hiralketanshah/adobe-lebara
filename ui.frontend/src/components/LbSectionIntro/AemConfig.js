import { MapTo } from "@adobe/aem-react-editable-components";
import LbSectionIntro from "./index";

const LbSectionIntroConfig = {
  emptyLabel: "Section Intro Component",
  isEmpty: function (props) {
    return !props || !props.sectionHeading;
  },
};

MapTo("lebara/components/sectionintro")(LbSectionIntro, LbSectionIntroConfig);
