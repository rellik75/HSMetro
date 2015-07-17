define(["jquery", "knockout", "pageLayout", "text!./hallway.html"], function ($, ko, pageLayout, hallwayTemplate) {

    function HallwayViewModel(route) {
        pageLayout.layoutPage();
    }

    return {
        viewModel: HallwayViewModel,
        template: hallwayTemplate
    };

});