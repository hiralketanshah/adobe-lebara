import { MapTo } from "@adobe/aem-react-editable-components";
import HeroBanner from "./HeroBanner";

const GetitNowConfig = {
    emptyLabel: "Get it now config",
    isEmpty: function (props) {
      return !props.title;
    },
};

MapTo("lebara/components/getitnow")(HeroBanner, GetitNowConfig);
