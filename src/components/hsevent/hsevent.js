define(['knockout', 'eventcontroller', 'config', 'text!./hsevent.html'], function (ko, eventcontroller, config, templateMarkup) {

    function HSEvent(params) {
        //$.mobile.loadingMessage = false;


        var self = this;
        self.timer = null;
        var proxyIP = config.proxyIP;
        var proxyPort = config.proxyPort;
        var url = config.url;
        var disabled = false;

        self.classInfo = ko.observable();
        if (params.hasOwnProperty("color")) {
            self.defaultColor = params.color;
        } else self.defaultColor = "bg-steel";
        self.classInfo("tile  fg-white " + self.defaultColor);
        
        self.timeout = params.timeout;
        self.group = ko.observable(params.group);
        self.event = ko.observable(params.event);
        self.timeoutIsVisible = ko.observable(false);

        self.icon = ko.observable();
        self.iconIsVisible = ko.observable(false);

        if (self.icon) {
            self.icon(url + params.icon);
            self.iconIsVisible(true);
        }

        self.runEvent = function () {
            if (!disabled) {
                disabled = true;
                self.timeoutIsVisible(true);
                var disableTile = setTimeout(function () {
                        disabled = false;
                        self.timeoutIsVisible(false);
                    }, self.timeout); 
                eventcontroller.runEvent({
                    "group": self.group(),
                    "url": url,
                    "event": self.event()
                });
            }
        }
    

    }

    // This runs when the component is torn down. Put here any logic necessary to clean up,
    // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
    HSEvent.prototype.dispose = function () {};

    return {
        viewModel: HSEvent,
        template: templateMarkup
    };

});