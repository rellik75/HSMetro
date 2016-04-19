define(["jquery", "knockout", "pageLayout", "metrojs", "text!./dining_room.html"], function ($, ko, pageLayout, metro, diningRoomTemplate) {

    function DiningRoomViewModel(route) {
        pageLayout.layoutPage();
    }

    return {
        viewModel: DiningRoomViewModel,
        template: diningRoomTemplate
    };

});