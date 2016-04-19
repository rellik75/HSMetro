define(["jquery", "knockout", "pageLayout", "metrojs", "text!./bedroom_2.html"], function ($, ko, pageLayout, metro, br2Template) {

    function BR2ViewModel(route) {
        pageLayout.layoutPage();
    }

    return {
        viewModel: BR2ViewModel,
        template: br2Template
    };

});