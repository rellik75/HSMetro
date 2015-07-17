define(["jquery", "knockout", "pageLayout", "text!./family_room.html"], function ($, ko, pageLayout, familyRoomTemplate) {

    function FamilyRoomViewModel(route) {
        pageLayout.layoutPage();
    }

    return {
        viewModel: FamilyRoomViewModel,
        template: familyRoomTemplate
    };

});