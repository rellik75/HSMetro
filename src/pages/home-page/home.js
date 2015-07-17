define(["jquery", "knockout", "metrojs", "pageLayout", "text!./home.html"], function ($, ko, metro, pageLayout, homeTemplate) {

    function HomeViewModel(route) {
        pageLayout.layoutPage();
    }
    

    return {
        viewModel: HomeViewModel,
        template: homeTemplate
    };

});