import { MapTo } from "@adobe/aem-react-editable-components";
import PlanOffers from "./PlanOffers";

const PlanOffersConfig = {
    emptyLabel: "FAQ",
    isEmpty: function (props) {
      return !props.title;
    },
};

MapTo("lebara/components/faq")(PlanOffers, PlanOffersConfig);
