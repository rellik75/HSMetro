define(["jquery", "knockout", "pageLayout", "text!./kitchen.html"], function ($, ko, pageLayout, kitchenTemplate) {

    function KitchenViewModel(route) {
        pageLayout.layoutPage();  
    }

    return {
        viewModel: KitchenViewModel,
        template: kitchenTemplate
    };

});