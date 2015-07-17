define(["jquery", "knockout", "pageLayout", "text!./entry.html"], function ($, ko, pageLayout, entryTemplate) {

    function EntryViewModel(route) {
        pageLayout.layoutPage();
    }

    return {
        viewModel: EntryViewModel,
        template: entryTemplate
    };

});