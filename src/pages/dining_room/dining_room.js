define(["jquery", "knockout", "pageLayout", "text!./dining_room.html"], function ($, ko, pageLayout, diningRoomTemplate) {

    function DiningRoomViewModel(route) {
        pageLayout.layoutPage();
    }

    return {
        viewModel: DiningRoomViewModel,
        template: diningRoomTemplate
    };

});