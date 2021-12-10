import { MapTo } from "@adobe/aem-react-editable-components";
import NewPostpaidNumberRoute from "@lebara/ui/src/rotues/NewPostpaidNumberRoute";
import aemUtils from "../utils/aem-utils";

const NewPostpaidNumberConfig = {
  emptyLabel: "Postpaid Component",
  isEmpty: function (props) {
    return !props.durationRadioLabelList;
  },
};
const componentwithofferDataProp=(props)=> <NewPostpaidNumberRoute fetchDataCallback={(id, isOneEntry)=> aemUtils.fetchData(id, isOneEntry)} {...props}/>;
MapTo("lebara/components/postpaid")(componentwithofferDataProp, NewPostpaidNumberConfig);
