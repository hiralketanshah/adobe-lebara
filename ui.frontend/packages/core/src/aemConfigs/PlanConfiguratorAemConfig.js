import { MapTo } from "@adobe/aem-react-editable-components";
import PlanConfigurator from "@lebara/netherlands/components/PlanConfigurator/index";

const PlanConfiguratorConfig = {
  emptyLabel: "Plan Configurator Component",
  isEmpty: function (props) {
    return !props.durationLabel;
  },
};

MapTo("lebara/components/nl/planconfigurator")(PlanConfigurator, PlanConfiguratorConfig);
