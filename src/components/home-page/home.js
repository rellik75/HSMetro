define(["knockout", "text!./home.html", 'jquery', 'jqueryui', 'metrojs'], function (ko, homeTemplate) {

    function HomeViewModel(route) {
        $(document).on("pageshow", "[data-role='page']", function () {
            $('div.ui-loader').remove();
            });
        $(".hstile, .live-tile, .flip-list").not(".exclude").liveTile();
        $(".tiles").sortable();
        $(".tiles").disableSelection();
        /*var wall = new freewall("#freewall");
			wall.reset({
						selector: '.tile',
                        cellW:300,
                        cellH:300,
						//fixSize: 1,
						gutterY: 2,
						gutterX: 2,
						onResize: function() {
							wall.fitWidth();
						}
					})
					wall.fitWidth();
				
				$(window).trigger("resize"); */
            
    }

    HomeViewModel.prototype.doSomething = function () {
        this.message('You invoked doSomething() on the viewmodel.');
    };

    return {
        viewModel: HomeViewModel,
        template: homeTemplate
    };

});