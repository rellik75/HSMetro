define(["jquery", "knockout", "pageLayout", "text!./media_room.html"], function ($, ko, pageLayout, mediaRoomTemplate) {

    function MediaRoomViewModel(route) {
        pageLayout.layoutPage();
    }

    return {
        viewModel: MediaRoomViewModel,
        template: mediaRoomTemplate
    };

});