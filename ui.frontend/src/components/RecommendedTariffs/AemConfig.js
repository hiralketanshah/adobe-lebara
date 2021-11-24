import { MapTo } from "@adobe/aem-react-editable-components";
import RecommendedTariffs from "./RecommendedTariffs";

const RecommendedTariffsConfig = {
  emptyLabel: "Recommended Tariffs Component",
  isEmpty: function (props) {
    return !props || !props.buttonLabel;
  },
};

MapTo("lebara/components/recommendplans")(RecommendedTariffs, RecommendedTariffsConfig);
