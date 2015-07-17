define(["jquery", "knockout", "pageLayout", "text!./den.html"], function ($, ko, pageLayout, denTemplate) {

    function DenViewModel(route) {
        pageLayout.layoutPage();
    }

    return {
        viewModel: DenViewModel,
        template: denTemplate
    };

});