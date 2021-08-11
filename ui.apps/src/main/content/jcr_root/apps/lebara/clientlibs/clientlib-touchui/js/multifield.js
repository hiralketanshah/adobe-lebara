/**
 * Provides limitation for multi-field components.
 * Default minItems = 0
 * Default maxItems = 5
 *
 * In the _cq_dialog, use:
 *     granite:class="lebara-multifield__editor"
 *     granite:data > minItems="{Long}1"
 *     granite:data > maxItems="{Long}5"
 */

(function (document, $) {

  "use strict";

  // CSS-based selectors
  var multifieldSelector = ".lebara-multifield__editor";
  var multifieldItemSelector = "._coral-Multifield-item";
  var showHideDropdownSelector = ".cq-dialog-dropdown-showhide";

  // var addButtonSelector = ".coral-Multifield-add";
  var addButtonSelector = 'button[coral-multifield-add=""]';
  var submitButtonSelector = ".cq-dialog-submit";

  // default values
  var minItems = 0;
  var maxItems = 5;

  /* counts how many elements the multifield has */
  function getFieldCount(multifield) {
          return multifield.find(multifieldItemSelector).length;
  }

  /* disable or enable buttons depends on min and max allowed items */
  function toggleButtons($fieldSet, fieldCount) {
    $fieldSet.find(addButtonSelector).prop("disabled", maxItems < fieldCount);
      }


  /* read configuration data from dialog just once when loading */
  $(document).on('dialog-loaded', function (e) {
     var multifield = $(this).find(multifieldSelector);

     if(multifield.length){

       minItems = multifield.attr("data-minitems") || minItems;
       maxItems = multifield.attr("data-maxitems") || maxItems;
       multifield.each(
           function (i, fieldSet) {
               var $fieldSet = $(fieldSet);
               toggleButtons($fieldSet, getFieldCount($fieldSet) + 1);
       });

       var disableSubmit = minItems > getFieldCount(multifield);
       if(minItems > 0){
         setTimeout(() => {
             if (disableSubmit) {
                 $(multifieldSelector).attr("hideMultifield", disableSubmit);
             }
         }, 2500);
       }

       /* treat change event on the dropdown */
       $(showHideDropdownSelector).click(function (event) {
            $(multifieldSelector).attr("hideMultifield", minItems > getFieldCount(multifield));

       });
     }
   });


  /* treat change event on the multifield */
  $(document).on('change', multifieldSelector, function (event) {
    var multifield = $(this);

    var count = getFieldCount(multifield);

    multifield.each(
      function (i, fieldSet) {
        var $fieldSet = $(fieldSet);

        // disable buttons on load when max is reached
        toggleButtons($fieldSet, getFieldCount($fieldSet));

        // validate on 'add' click
        $fieldSet.children(addButtonSelector).click(function () {
          toggleButtons($fieldSet, getFieldCount($fieldSet) + 1);
        });

        // reset 'add' button when items are removed
        $fieldSet.on("click", ".coral-Icon--delete", function () {
          toggleButtons($fieldSet, getFieldCount($fieldSet) - 1);
        });

    });
  });

})(document, Granite.$);
