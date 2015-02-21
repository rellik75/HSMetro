define(["knockout", "text!./home.html", 'jquery', 'jqueryui', 'metrojs'], function (ko, homeTemplate) {

    function HomeViewModel(route) {
        $(".hstile, .live-tile, .flip-list").not(".exclude").liveTile();
        $(".tiles").sortable();
        $(".tiles").disableSelection();
    }

    HomeViewModel.prototype.doSomething = function () {
        this.message('You invoked doSomething() on the viewmodel.');
    };

    return {
        viewModel: HomeViewModel,
        template: homeTemplate
    };

});