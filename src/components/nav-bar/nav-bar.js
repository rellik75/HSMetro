define(['knockout', 'config', 'text!./nav-bar.html'], function(ko, config, template) {

  function NavBarViewModel(params) {
      
      var navBarItems=config.navBarItems;
      var self=this;
      self.master_br=ko.observable(navBarItems.master_br);
      self.kitchen=ko.observable(navBarItems.kitchen);
      self.hallway=ko.observable(navBarItems.hallway);
      self.guest_room=ko.observable(navBarItems.guest_room);
      self.media_room=ko.observable(navBarItems.media_room);
      self.office=ko.observable(navBarItems.office);
      self.patio=ko.observable(navBarItems.patio);
      self.den=ko.observable(navBarItems.den);
      self.bedroom_1=ko.observable(navBarItems.bedroom_1);
      self.bedroom_2=ko.observable(navBarItems.bedroom_2);
      self.bedroom_3=ko.observable(navBarItems.bedroom_3);
      self.study=ko.observable(navBarItems.study);
      self.entry=ko.observable(navBarItems.entry);
      self.garage=ko.observable(navBarItems.garage);
      self.dining_room=ko.observable(navBarItems.dining_room);
      self.outside=ko.observable(navBarItems.outside);
      self.living_room=ko.observable(navBarItems.living_room);
      self.family_room=ko.observable(navBarItems.family_room);


    this.route = params.route;
  }

  return { viewModel: NavBarViewModel, template: template };
});
