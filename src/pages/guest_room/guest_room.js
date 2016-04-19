define(["jquery", "knockout", "pageLayout", "metrojs", "text!./guest_room.html"], function ($, ko, pageLayout, metro, guestRoomTemplate) {

    function GuestRoomViewModel(route) {
        pageLayout.layoutPage();
    }

    return {
        viewModel: GuestRoomViewModel,
        template: guestRoomTemplate
    };

});