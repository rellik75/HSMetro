define(['knockout', 'config', 'text!./nav-bar.html'], function(ko, config, template) {

  function NavBarViewModel(params) {
      
      var navBarItems=config.navBarItems;
      var navBarLabels=config.navBarLabels;
      var self=this;
      
      var items=[];
      for (var property in navBarItems) {
        if (navBarItems.hasOwnProperty(property)) {
         if (navBarItems[property]) {
             items.push("<li data-bind='css: { active: route().page === '" + property + "' }> <a href='#" + property + "'>"+navBarLabels[property]+"</a> </li>");
         }
        }
      }
      $('#navbar').append( items.join('') );
      
      self.main_label=ko.observable(navBarLabels.main);


    this.route = params.route;
  }

  return { viewModel: NavBarViewModel, template: template };
});
