define(['knockout', 'eventcontroller', 'config', 'text!./hsevent.html'], function(ko,  eventcontroller, config, templateMarkup) {

  function HSEvent(params) {
        //$.mobile.loadingMessage = false;


        var self = this;
        self.timer = null;
        var proxyIP=config.proxyIP;
        var proxyPort=config.proxyPort;
        var url=config.url;

        self.classInfo = ko.observable();
        if (params.hasOwnProperty("width")) {
            self.defaultWidth = params.width;
        } else self.defaultWidth = "one-wide";
        if (params.hasOwnProperty("color")) {
            self.defaultColor = params.color;
        } else self.defaultColor = "steel";
        self.classInfo("live-tile exclude accent " + self.defaultColor + " " + self.defaultWidth);
        
        self.group=ko.observable(params.group);
        self.event=ko.observable(params.event);

        self.icon = ko.observable();
        self.iconIsVisible=ko.observable(false);
      
        if (self.icon) {
                self.icon(url + params.icon); 
                self.iconIsVisible(true);
        }
        
        self.runEvent=function() {
            eventcontroller.runEvent({
                "group": self.group(),
                "url": url,
                "event": self.event()
            });            
        }
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  HSEvent.prototype.dispose = function() { };
  
  return { viewModel: HSEvent, template: templateMarkup };

});
