define(['jquery', 'knockout', './router', 'bootstrap', 'knockout-projections'], function ($, ko, router) {

    // Components can be packaged as AMD modules, such as the following:
    ko.components.register('home-page', {
        require: 'components/home-page/home'
    });

    // ... or for template-only components, you can just point to a .html file directly:
    /*ko.components.register('about-page', {
      template: { require: 'text!components/about-page/about.html' }
    });*/

    ko.components.register('hsdevice', {
        require: 'components/hsdevice/hsdevice'
    });

    ko.components.register('weather', {
        require: 'components/weather/weather'
    });

    ko.components.register('clock', {
        require: 'components/clock/clock'
    });

    ko.components.register('refresh', {
        require: 'components/refresh/refresh'
    });

    ko.components.register('hsthermostat', {
        require: 'components/hsthermostat/hsthermostat'
    });
    

    ko.components.register('hsstatusdevice', { require: 'components/hsstatusdevice/hsstatusdevice' });
    

    ko.components.register('staticimage', { require: 'components/staticimage/staticimage' });
    
    

    ko.components.register('webpage', { require: 'components/webpage/webpage' });
    
    

    ko.components.register('hsevent', { require: 'components/hsevent/hsevent' });
    
    

    // [Scaffolded component registrations will be inserted here. To retain this feature, don't remove this comment.]

    // Start the application
    ko.applyBindings({
        route: router.currentRoute
    });



});