import {withPageHook, App} from "../../core/src/setupApp";
import store from "@lebara/netherlands/redux/store";
import { withModel } from "@adobe/aem-react-editable-components";
export default withModel(withPageHook(App, store));