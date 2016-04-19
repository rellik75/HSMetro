define(["jquery", "knockout", "pageLayout", "metrojs", "text!./kitchen.html"], function ($, ko, pageLayout, metro, br1Template) {

    function BR1ViewModel(route) {
        pageLayout.layoutPage();
    }

    return {
        viewModel: BR1ViewModel,
        template: br1Template
    };

});