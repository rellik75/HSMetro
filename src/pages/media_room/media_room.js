define(["jquery", "knockout", "pageLayout", "metrojs", "text!./media_room.html"], function ($, ko, pageLayout, metro, mediaRoomTemplate) {

    function MediaRoomViewModel(route) {
        pageLayout.layoutPage();
    }

    return {
        viewModel: MediaRoomViewModel,
        template: mediaRoomTemplate
    };

});