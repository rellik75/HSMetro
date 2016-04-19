define(["jquery", "knockout", "pageLayout", "metrojs", "text!./office.html"], function ($, ko, pageLayout, metro, officeTemplate) {

    function OfficeViewModel(route) {
        pageLayout.layoutPage();
    }

    return {
        viewModel: OfficeViewModel,
        template: officeTemplate
    };

});