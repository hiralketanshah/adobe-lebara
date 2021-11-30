import { MapTo } from "@adobe/aem-react-editable-components";
import RewardOverview from "./RewardOverview";

const RewardOverviewConfig = {
  emptyLabel: "Rewards Table Component",
  isEmpty: function (props) {
    return !props || !props.heading;
  },
};

MapTo("lebara/components/rewardstable")(RewardOverview, RewardOverviewConfig);
