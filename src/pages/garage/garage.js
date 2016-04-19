define(["jquery", "knockout", "pageLayout", "metrojs", "text!./garage.html"], function ($, ko, pageLayout, metro, garageTemplate) {

    function GarageViewModel(route) {
        pageLayout.layoutPage();
    }

    return {
        viewModel: GarageViewModel,
        template: garageTemplate
    };

});