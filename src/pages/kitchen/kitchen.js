define(["jquery", "knockout", "pageLayout", "metrojs", "text!./kitchen.html"], function ($, ko, pageLayout, metro, kitchenTemplate) {

    function KitchenViewModel(route) {
        pageLayout.layoutPage();  
    }

    return {
        viewModel: KitchenViewModel,
        template: kitchenTemplate
    };

});