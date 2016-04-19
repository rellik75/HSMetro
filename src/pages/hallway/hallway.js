define(["jquery", "knockout", "pageLayout", "metrojs", "text!./hallway.html"], function ($, ko, pageLayout, metro, hallwayTemplate) {

    function HallwayViewModel(route) {
        pageLayout.layoutPage();
    }

    return {
        viewModel: HallwayViewModel,
        template: hallwayTemplate
    };

});