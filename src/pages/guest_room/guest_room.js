define(["jquery", "knockout", "pageLayout", "text!./guest_room.html"], function ($, ko, pageLayout, guestRoomTemplate) {

    function GuestRoomViewModel(route) {
        pageLayout.layoutPage();
    }

    return {
        viewModel: GuestRoomViewModel,
        template: guestRoomTemplate
    };

});