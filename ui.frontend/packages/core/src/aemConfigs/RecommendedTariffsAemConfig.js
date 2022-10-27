import { MapTo } from "@adobe/aem-react-editable-components";
import RecommendedTariffs from "@lebara/core/components/RecommendedTariffs/RecommendedTariffs";
import "../styles/recommendedTariff.style.css";

const RecommendedTariffsConfig = {
  emptyLabel: "Recommended Tariffs Component",
  isEmpty: function (props) {
    return !props || !props.buttonLabel;
  },
};

MapTo("lebara/components/plans/recommendedtariff")(RecommendedTariffs, RecommendedTariffsConfig);
