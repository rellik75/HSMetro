define(['jquery', 'knockout', 'metrojs', './router', 'bootstrap', 'knockout-projections'], function ($, ko, metro, router) {

    
    //HSMetro Components are registered here//
    ko.components.register('nav-bar', { require: 'components/nav-bar/nav-bar' });
    ko.components.register('hsdevice', {require: 'components/hsdevice/hsdevice'});
    ko.components.register('weather', {require: 'components/weather/weather'});
    ko.components.register('clock', {require: 'components/clock/clock'});
    ko.components.register('refresh', {require: 'components/refresh/refresh'});
    ko.components.register('hsthermostat', {require: 'components/hsthermostat/hsthermostat'});
    ko.components.register('hsstatusdevice', { require: 'components/hsstatusdevice/hsstatusdevice' });
    ko.components.register('staticimage', { require: 'components/staticimage/staticimage' });
    ko.components.register('webpage', { require: 'components/webpage/webpage' });   
    ko.components.register('hsevent', { require: 'components/hsevent/hsevent' });
    ko.components.register('hstextstatusdevice', { require: 'components/hstextstatusdevice/hstextstatusdevice' });
    ko.components.register('hsnavidevice', { require: 'components/hsnavidevice/hsnavidevice' });
    //End Component Registration//
    
    //HSMetro Pages are registered here.  The first parameter must match the page value specified in router.js//
    ko.components.register('home-page', {require: 'pages/home-page/home'});
    ko.components.register('kitchen', {require: 'pages/kitchen/kitchen' });
    ko.components.register('master_br', {require: 'pages/master_br/master_br'});
    ko.components.register('guest_room', {require: 'pages/guest_room/guest_room'});
    ko.components.register('media_room', {require: 'pages/media_room/media_room'});
    ko.components.register('office', {require: 'pages/office/office'});
    ko.components.register('patio', {require: 'pages/patio/patio'});
    ko.components.register('den', {require: 'pages/den/den'});
    ko.components.register('bedroom_1', {require: 'pages/bedroom_1/bedroom_1'});
    ko.components.register('bedroom_2', {require: 'pages/bedroom_2/bedroom_2'});
    ko.components.register('bedroom_3', {require: 'pages/bedroom_3/bedroom_3'});
    ko.components.register('study', {require: 'pages/study/study'});
    ko.components.register('entry', {require: 'pages/entry/entry'});
    ko.components.register('garage', {require: 'pages/garage/garage'});
    ko.components.register('dining_room', {require: 'pages/dining_room/dining_room'});
    ko.components.register('outside', {require: 'pages/outside/outside'});
    ko.components.register('living_room', {require: 'pages/living_room/living_room'});
    ko.components.register('family_room', {require: 'pages/family_room/family_room'});
    ko.components.register('hallway', {require: 'pages/hallway/hallway'});
    //End Page Registration//
    

    // [Scaffolded component registrations will be inserted here. To retain this feature, don't remove this comment.]

    // Start the application
    ko.applyBindings({
        route: router.currentRoute
    });



});