import { ModelClient } from '@adobe/aem-spa-page-model-manager';
import { setLoading } from "@lebara/ui/src/redux/actions/loadingActions";
import { useDispatch } from "react-redux";

/**
 * Used to show the loader image before any model call.
 */
export default class LebaraModelClient extends ModelClient {

    fetch(modelPath) {
        console.log("LebaramodelClient");
       //const dispatch = useDispatch();// eslint-disable-line react-hooks/exhaustive-deps

        if (!modelPath) {
            const err = `Fetching model rejected for path: ${modelPath}`;

            return Promise.reject(new Error(err));
        }

        // Either the API host has been provided or we make an absolute request relative to the current host
        const apihostPrefix = this._apiHost || '';
        const url = `${apihostPrefix}${modelPath}`;

        //dispatch(setLoading(true));
        console.log("Loading image here");
        return fetch(url, { credentials: 'same-origin' }).then((response) => {
            //dispatch(setLoading(false));
            console.log("Hide Loading image in success");
            if ((response.status >= 200) && (response.status < 300)) {
                return response.json();
            }

            throw { response };
        }).catch((error) => {
            //dispatch(setLoading(false));
            console.log("Hide Loading image in failure");
            return Promise.reject(error);
        });

    }
}