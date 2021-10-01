import { MapTo } from "@adobe/aem-react-editable-components";
import Trustpilot from "./Trustpilot";

const TrustpilotConfig = {
    emptyLabel: "FAQ",
    isEmpty: function (props) {
      return !props.title;
    },
};

MapTo("lebara/components/faq")(Trustpilot, TrustpilotConfig);
