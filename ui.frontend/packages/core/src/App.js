import {withPageHook, App} from "./setupApp";
import { withModel } from "@adobe/aem-react-editable-components";
import store from "@lebara/core/store";
export default withModel(withPageHook(App, store));