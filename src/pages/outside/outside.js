define(["jquery", "knockout", "pageLayout", "text!./outside.html"], function ($, ko, pageLayout, outsideTemplate) {

    function OutsideViewModel(route) {
        pageLayout.layoutPage();
    }

    return {
        viewModel: OutsideViewModel,
        template: outsideTemplate
    };

});