import { MapTo } from "@adobe/aem-react-editable-components";
import Trustpilot from "./Trustpilot";

const TrustpilotConfig = {
    emptyLabel: "Trust Pilot",
    isEmpty: function (props) {
      return !props.totalRatings | !props.ratingValue | !props.totalStars
    },
};

MapTo("lebara/components/faq")(Trustpilot, TrustpilotConfig);
