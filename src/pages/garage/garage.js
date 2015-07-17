define(["jquery", "knockout", "pageLayout", "text!./garage.html"], function ($, ko, pageLayout, garageTemplate) {

    function GarageViewModel(route) {
        pageLayout.layoutPage();
    }

    return {
        viewModel: GarageViewModel,
        template: garageTemplate
    };

});