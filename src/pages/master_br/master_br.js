define(["jquery", "knockout", "pageLayout", "metrojs", "text!./master_br.html"], function ($, ko, pageLayout, metro, master_brTemplate) {

    function MasterBRViewModel(route) {
        pageLayout.layoutPage();
    }


    return {
        viewModel: MasterBRViewModel,
        template: master_brTemplate
    };

});