define(["jquery", "knockout", "pageLayout", "text!./living_room.html"], function ($, ko, pageLayout, livingRoomTemplate) {

    function LivingRoomViewModel(route) {
        pageLayout.layoutPage();
    }

    return {
        viewModel: LivingRoomViewModel,
        template: livingRoomTemplate
    };

});