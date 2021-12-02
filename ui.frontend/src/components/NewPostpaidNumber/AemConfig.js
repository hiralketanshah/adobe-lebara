import { MapTo } from "@adobe/aem-react-editable-components";
import NewPostpaidNumber from "@lebara/ui/src/components/NewPostpaidNumber/NewPostpaidNumber";

const NewPostpaidNumberConfig = {
  emptyLabel: "Postpaid Component",
  isEmpty: function (props) {
    return !props.durationRadioLabelList;
  },
};

MapTo("lebara/components/postpaid")(NewPostpaidNumber, NewPostpaidNumberConfig);
