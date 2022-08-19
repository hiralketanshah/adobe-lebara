import { MapTo } from "@adobe/aem-react-editable-components";
import Trustpilot from "@lebara/core/components/Trustpilot/Trustpilot";

const TrustpilotConfig = {
    emptyLabel: "Trust Pilot",
    isEmpty: function (props) {
      return !props.totalRatings | !props.ratingValue | !props.totalStars
    },
};

MapTo("lebara/components/trustpilotrating")(Trustpilot, TrustpilotConfig);
