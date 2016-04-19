define(["jquery", "knockout", "pageLayout", "metrojs", "text!./bedroom_3.html"], function ($, ko, pageLayout, metro, br3Template) {

    function BR3ViewModel(route) {
        pageLayout.layoutPage();
    }

    return {
        viewModel: BR3ViewModel,
        template: br3Template
    };

});