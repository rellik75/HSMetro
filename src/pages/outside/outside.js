define(["jquery", "knockout", "pageLayout", "metrojs", "text!./outside.html"], function ($, ko, pageLayout, metro, outsideTemplate) {

    function OutsideViewModel(route) {
        pageLayout.layoutPage();
    }

    return {
        viewModel: OutsideViewModel,
        template: outsideTemplate
    };

});