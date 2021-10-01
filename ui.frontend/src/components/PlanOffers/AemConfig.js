import { MapTo } from "@adobe/aem-react-editable-components";
import PlanOffers from "./PlanOffers";

const PlanOffersConfig = {
    emptyLabel: "Detailed View Plans",
    isEmpty: function (props) {
      return !props.name;
    },
};

MapTo("lebara/components/detailedviewplans")(PlanOffers, PlanOffersConfig);
