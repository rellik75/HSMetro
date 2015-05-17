define(['jquery','knockout', "text!./home.html",  'jqueryui', 'metrojs', 'js-packery'], function ($,ko, homeTemplate) {

    function HomeViewModel(route) {
        var container=document.querySelector("#tilewall");
        var pckry=new Packery(container, {
            itemSelector: '.hstile',
            gutter: 10
        });
        //$(".hstile, .live-tile, .flip-list").not(".exclude").liveTile();
        //$(".tiles").sortable();
        //$(".tiles").disableSelection();
            /*var wall = new freewall(homeTemplate.$rootElement);
            wall.fitWidth();
			wall.reset({
                draggable: true,
						selector: '.hstile',
                        animate: true,
                        cellW:'150',
                        cellH:'150',
						fixSize: 1,

						onResize: function() {
							wall.refresh();
						}
					})
					wall.fitWidth();
				$(window).trigger("resize");*/
        
				}

            
    

    HomeViewModel.prototype.doSomething = function () {
        this.message('You invoked doSomething() on the viewmodel.');
    };

    return {
        viewModel: HomeViewModel,
        template: homeTemplate
    };

});