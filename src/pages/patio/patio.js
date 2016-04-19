define(["jquery", "knockout", "pageLayout", "metrojs", "text!./patio.html"], function ($, ko, pageLayout, metro, patioTemplate) {

    function PatioViewModel(route) {
        pageLayout.layoutPage();
    }

    return {
        viewModel: PatioViewModel,
        template: patioTemplate
    };

});