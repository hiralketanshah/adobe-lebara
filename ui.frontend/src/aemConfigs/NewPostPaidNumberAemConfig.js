import { MapTo } from "@adobe/aem-react-editable-components";
import NewPostpaidNumberRoute from "./NewPostpaidNumberRoute";
// import NewPostpaidNumber from "@lebara/ui/src/components/NewPostpaidNumber/NewPostpaidNumber";

const NewPostpaidNumberConfig = {
  emptyLabel: "Postpaid Component",
  isEmpty: function (props) {
    return !props.durationRadioLabelList;
  },
};

MapTo("lebara/components/postpaid")(NewPostpaidNumberRoute, NewPostpaidNumberConfig);
