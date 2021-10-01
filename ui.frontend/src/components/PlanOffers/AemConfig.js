import { MapTo } from "@adobe/aem-react-editable-components";
import PlanOffers from "./PlanOffers";

const PlanOffersConfig = {
    emptyLabel: "Plan Offers",
    isEmpty: function (props) {
      return !props.name;
    },
};

MapTo("lebara/components/faq")(PlanOffers, PlanOffersConfig);
