import { MapTo } from "@adobe/aem-react-editable-components";
import NewPostpaidNumberRoute from "@lebara/core/rotues/NewPostpaidNumberRoute";
import aemUtils from "../utils/aem-utils";

const NewPostpaidNumberConfig = {
  emptyLabel: "Postpaid Component",
  isEmpty: function (props) {
    return !props.durationRadioLabelList;
  },
};
const componentwithofferDataProp=(props)=> <NewPostpaidNumberRoute {...props} fetchDataCallback={(id, isOneEntry)=> aemUtils.fetchData(id, isOneEntry)}/>;
MapTo("lebara/components/postpaid")(componentwithofferDataProp, NewPostpaidNumberConfig);
