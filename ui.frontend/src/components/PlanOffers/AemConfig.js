import { MapTo } from "@adobe/aem-react-editable-components";
import PlanOffers from "./PlanOffers";

const PlanOffersConfig = {
  emptyLabel: "Detailed View Plans",
  isEmpty: function (props) {
    return (
      !props ||
      !props?.offers ||
      !props.buttonLabel ||
      !props.title ||
      !props.subTitle ||
      !props.description ||
      !props.hideLabel ||
      !props.ctaTopLink ||
      !props.ctaTopLabel ||
      !props.ctaBottomLink ||
      !props.ctaBottomLabel ||
      !props.buttonLabel
    );
  },
};

MapTo("lebara/components/detailedviewplans")(PlanOffers, PlanOffersConfig);
