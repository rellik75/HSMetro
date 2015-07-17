define(["jquery", "knockout", "pageLayout", "text!./master_br.html"], function ($, ko, pageLayout, master_brTemplate) {

    function MasterBRViewModel(route) {
        pageLayout.layoutPage();
    }


    return {
        viewModel: MasterBRViewModel,
        template: master_brTemplate
    };

});