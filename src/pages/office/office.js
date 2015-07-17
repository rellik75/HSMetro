define(["jquery", "knockout", "pageLayout", "text!./office.html"], function ($, ko, pageLayout, officeTemplate) {

    function OfficeViewModel(route) {
        pageLayout.layoutPage();
    }

    return {
        viewModel: OfficeViewModel,
        template: officeTemplate
    };

});