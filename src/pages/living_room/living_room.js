define(["jquery", "knockout", "pageLayout", "metrojs", "text!./living_room.html"], function ($, ko, pageLayout, metro,  livingRoomTemplate) {

    function LivingRoomViewModel(route) {
        pageLayout.layoutPage();
    }

    return {
        viewModel: LivingRoomViewModel,
        template: livingRoomTemplate
    };

});