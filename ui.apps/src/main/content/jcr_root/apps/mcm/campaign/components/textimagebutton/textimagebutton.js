
"use strict";

/**
 * Text and Image component JS Use-api script
 */
use(["/libs/wcm/foundation/components/utils/AuthoringUtils.js",
     "/libs/sightly/js/3rd-party/q.js"], function (AuthoringUtils, Q) {

    var textimagebutton = {};
    
    var CONST = {
        PROP_TEXT: "text"
    };

    var hasContentDeferred = Q.defer();
    if (granite.resource.properties[CONST.PROP_TEXT]) {
        hasContentDeferred.resolve(true);
    }
    granite.resource.resolve(granite.resource.path + "/image").then(function (imageResource) {
        if (imageResource.properties["fileReference"]) {
            hasContentDeferred.resolve(true);
        } else {
            granite.resource.resolve(granite.resource.path + "/image/file").then(function (localImage) {
                hasContentDeferred.resolve(true);
            }, function () {
                hasContentDeferred.resolve(false);
            });
        }
    }, function () {
        hasContentDeferred.resolve(false);
    });
   
    textimagebutton.CONST = CONST;
    
    textimagebutton.isTouch = AuthoringUtils.isTouch;
    
    textimagebutton.hasContent = hasContentDeferred.promise;
    
    return textimagebutton;
    
});