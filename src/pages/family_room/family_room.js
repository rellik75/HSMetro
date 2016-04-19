define(["jquery", "knockout", "pageLayout", "metrojs", "text!./family_room.html"], function ($, ko, pageLayout, metro, familyRoomTemplate) {

    function FamilyRoomViewModel(route) {
        pageLayout.layoutPage();
    }

    return {
        viewModel: FamilyRoomViewModel,
        template: familyRoomTemplate
    };

});