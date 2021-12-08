import { MapTo } from "@adobe/aem-react-editable-components";
import RecommendedTariffs from "@lebara/ui/src/components/RecommendedTariffs/RecommendedTariffs";

const RecommendedTariffsConfig = {
  emptyLabel: "Recommended Tariffs Component",
  isEmpty: function (props) {
    return !props || !props.buttonLabel;
  },
};

MapTo("lebara/components/plans/recommendedtariff")(RecommendedTariffs, RecommendedTariffsConfig);
