import { MapTo } from "@adobe/aem-react-editable-components";
import TrustpilotReviews from "@lebara/netherlands/components/TrustpilotReviews/index";

const TrustpilotConfig = {
    emptyLabel: "Trust Pilot Component",
    isEmpty: function (props) {
      return !props.title
    },
};

MapTo("lebara/components/trustpilot")(TrustpilotReviews, TrustpilotConfig);
