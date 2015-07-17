define(["jquery", "knockout", "pageLayout", "text!./patio.html"], function ($, ko, pageLayout, patioTemplate) {

    function PatioViewModel(route) {
        pageLayout.layoutPage();
    }

    return {
        viewModel: PatioViewModel,
        template: patioTemplate
    };

});