(function($) {
    "use strict";

    var dialogContentSelector = ".cmp-teaser__editor";
    var colorsEnabledCheckboxSelector = 'coral-checkbox[name="./colorsEnabled"]';
    var backgroundColorSelector = '[name="./buttonBackgroundColor"]';
    var textColorSelector = '[name="./buttonTextColor"]';
    var hoverColorSelector = '[name="./buttonHoverBgColor"]';
    var hoverTextColorSelector = '[name="./buttonHoverTextColor"]';
    var colorsEnabled;
 

    $(document).on("dialog-loaded", function(e) {
        var $dialog = e.dialog;
        var $dialogContent = $dialog.find(dialogContentSelector);
        var dialogContent = $dialogContent.length > 0 ? $dialogContent[0] : undefined;
        if (dialogContent) {
           init(e, $dialog, $dialogContent, dialogContent);
        }
    });

    function init(e, $dialog, $dialogContent, dialogContent) {        
        var $colorsEnabledCheckbox = $dialogContent.find(colorsEnabledCheckboxSelector);
        if ($colorsEnabledCheckbox.size() > 0) {          
            colorsEnabled = $colorsEnabledCheckbox.adaptTo("foundation-field").getValue() === "true";
            toggleInputs($dialogContent);
            $colorsEnabledCheckbox.on("change", function(e) {
                colorsEnabled = $(e.target).adaptTo("foundation-field").getValue() === "true";
                toggleInputs($dialogContent);                
            });            
        }        
    }

    function toggleInputs(dialogContent) {       
        var backgroundColorField = dialogContent.find(backgroundColorSelector).adaptTo("foundation-field"); 
        var textColorField = dialogContent.find(textColorSelector).adaptTo("foundation-field");
        var hoverColorField = dialogContent.find(hoverColorSelector).adaptTo("foundation-field");
        var hoverTextColorField = dialogContent.find(hoverTextColorSelector).adaptTo("foundation-field");
        if (backgroundColorField) {
            if (colorsEnabled) {
                backgroundColorField.setDisabled(false); 
                textColorField.setDisabled(false); 
                hoverColorField.setDisabled(false); 
                hoverTextColorField.setDisabled(false); 
            } else {
                backgroundColorField.setDisabled(true); 
                textColorField.setDisabled(true); 
                hoverColorField.setDisabled(true);
                hoverTextColorField.setDisabled(true); 
            }
        }
    }
})(jQuery);
