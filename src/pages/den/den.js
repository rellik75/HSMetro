define(["jquery", "knockout", "pageLayout", "metrojs", "text!./den.html"], function ($, ko, pageLayout, metro, denTemplate) {

    function DenViewModel(route) {
        pageLayout.layoutPage();
    }

    return {
        viewModel: DenViewModel,
        template: denTemplate
    };

});