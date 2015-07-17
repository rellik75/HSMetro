define(["jquery", "knockout", "pageLayout", "text!./bedroom_2.html"], function ($, ko, pageLayout, br2Template) {

    function BR2ViewModel(route) {
        pageLayout.layoutPage();
    }

    return {
        viewModel: BR2ViewModel,
        template: br2Template
    };

});