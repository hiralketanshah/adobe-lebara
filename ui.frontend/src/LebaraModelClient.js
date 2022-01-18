import { ModelClient } from '@adobe/aem-spa-page-model-manager';

/**
 * Used to show the loader image before any model call.
 */

 const renderLoader = (isLoading) => {
    if(isLoading) {
        if(document.querySelector("body #modelRootLoader")) {
            document.querySelector("body #modelRootLoader").style.display = "block";
        }
    } else {
        if(document.querySelector("body #modelRootLoader")) {
            document.querySelector("body #modelRootLoader").style.display = "none";
        }
    }
  };
  
export default class LebaraModelClient extends ModelClient {

    fetch(modelPath) {
        if (!modelPath) {
            const err = `Fetching model rejected for path: ${modelPath}`;
            return Promise.reject(new Error(err));
        }

        // Either the API host has been provided or we make an absolute request relative to the current host
        const apihostPrefix = this._apiHost || '';
        const url = `${apihostPrefix}${modelPath}`;

        renderLoader(true);

        return fetch(url, { credentials: 'same-origin' }).then((response) => {
            if ((response.status >= 200) && (response.status < 300)) {
                return response.json();
            }
            throw { response };
        }).catch((error) => {
            return Promise.reject(error);
        }).finally(() => {
            renderLoader(false);
        });
    }
}