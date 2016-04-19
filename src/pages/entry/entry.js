define(["jquery", "knockout", "pageLayout", "metrojs", "text!./entry.html"], function ($, ko, pageLayout, metro, entryTemplate) {

    function EntryViewModel(route) {
        pageLayout.layoutPage();
    }

    return {
        viewModel: EntryViewModel,
        template: entryTemplate
    };

});