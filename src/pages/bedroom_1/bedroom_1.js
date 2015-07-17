define(["jquery", "knockout", "pageLayout", "text!./kitchen.html"], function ($, ko, pageLayout, br1Template) {

    function BR1ViewModel(route) {
        pageLayout.layoutPage();
    }

    return {
        viewModel: BR1ViewModel,
        template: br1Template
    };

});