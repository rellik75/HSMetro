define(['jquery', 'knockout', 'devicecontroller', 'config', 'text!./hsdevice.html', 'jqueryui', 'touchpunch', 'underscore', 'faye', 'jquerymobile'], function ($, ko, devicecontroller, config, templateMarkup) {

    function HSDWidget(params) {

        var self = this;
        self.timer = null;
        //var proxyIP = params.proxyIP;
        //var proxyPort = params.proxyPort;
        //debugger;
        var proxyIP=config.proxyIP;
        var proxyPort=config.proxyPort;

        self.classInfo = ko.observable();
        if (params.hasOwnProperty("width")) {
            self.defaultWidth = params.width;
        } else self.defaultWidth = "one-wide";
        if (params.hasOwnProperty("color")) {
            self.defaultColor = params.color;
        } else self.defaultColor = "steel";
        //self.classInfo("live-tile exclude accent " + self.defaultColor + " " + self.defaultWidth);

        self.icons = params.icons;
        self.ref = params.ref;
        //self.url = params.url;
        self.url=config.url;
        self.device = ko.observable();
        self.statusIcon = ko.observable();
        self.controlButtonsVisible = ko.observable(false);

        self.toggleDevice = function (params) {
            if (self.timer != null) {
                clearTimeout(self.timer);
                self.timer = null;
            }
            //var newstatus = (self.status() == "On" ? "Off" : "On");
            var o = _.find(self.device().controlPairs(), function (item) {
                //debugger;
                return item.Label == self.device().status();
            });
            //debugger;
            var i = _.indexOf(self.device().controlPairs(), o);
            ++i;
            if (i >= _.size(self.device().controlPairs())) {
                i = 0;
            }
            //debugger;
            var label = self.device().controlPairs()[i].Label;
            if (self.device().controlPairs()[i].Range != null) {
                self.controlButtonsVisible(true);
                if (self.device().value() > self.device().controlPairs()[i].Range.RangeEnd) {
                    self.device().value(self.device().controlPairs()[i].Range.RangeEnd);
                }
            } else{
                self.device().value(self.device().controlPairs()[i].ControlValue);
                self.controlButtonsVisible(false);
            }
                
            //debugger; 
            self.device().status(label);           
            self.timer = setTimeout(devicecontroller.control, 3000, {
                "ref": self.ref,
                "url": self.url,
                "value": self.device().value()
            });
            //debugger;
            setStatusIcon(self);
        };

        self.rangeUp = function (device, event) {
            //debugger;
            event.stopPropagation();
            var currentVal = self.device().value();
            if (currentVal < 98) {
                if ((currentVal + 10) < 98) {
                    if (currentVal === 1) {
                        self.device().value(10);
                    } else
                        self.device().value(currentVal + 10);
                } else {
                    self.device().value(98);
                }
            }
            devicecontroller.control({
                "ref": self.ref,
                "url": self.url,
                "value": self.device().value()
            });
        };

        self.rangeDown = function (device, event) {
            event.stopPropagation();
            var currentVal = self.device().value();
            if (currentVal >= 1) {
                if ((currentVal - 10) > 1) {
                    self.device().value(currentVal - 10);
                } else {
                    self.device().value(1);
                }
            }
            devicecontroller.control({
                "ref": self.ref,
                "url": self.url,
                "value": self.device().value()
            });
        }

        var setStatusIcon = function () {
            var iconPath;
            var status = self.device().status();
            
            var _classInfo="live-tile exclude " + self.defaultWidth;

            if (String(status).match(/Dim/)) {
                status = "On";
                self.controlButtonsVisible(true);
            } else if (String(status).match(/On/)) {
                status = "On";
            } else if (String(status).match(/Lock/)) {
                status = "Locked";
            } else if (String(status).match(/Unlock/)) {
                status = "Unlocked";
            }
            if (self.icons) {
                iconPath = self.icons[status.toLowerCase()];
            } else
                iconPath = "/images/HomeSeer/status/unknown.png"
                
            self.statusIcon(self.url + iconPath);    

            switch (status) {

            case "Locked":
            case "Lock":
            case "On Last Level":
                //case ((String(device.status()).toLowerCase().match(/dim/)) ? device.status() : "undefined"):
            case "On":
                {
                    //self.classInfo(_classInfo + " accent green" );
                    break;
                }
            case "Away":
                {
                    //self.classInfo(_classInfo + " accent mauve");
                    break;
                }
            case "Night":
                {
                   // self.classInfo(_classInfo + " accent orange");
                    break;
                }
            case "Arm":
            case "Armed":
                {
                   // self.classInfo(_classInfo + " accent red");
                    break;
                }
            case "Unlock":
            case "Unlocked":
            case "Opened":
                {
                    //self.classInfo(_classInfo + " accent orange");
                    break;
                }
            case "Unknown":
            case "Off":
            case "Home":
            case "Disarm":
            case "Disarmed":
            default:
                {
                    //self.classInfo(_classInfo + " accent " + self.defaultColor);
                    break;
                }
            }
        }

        $.when(devicecontroller.query({
            "url": self.url,
            "ref": self.ref
        })).done(function (data) {
            self.device(data);
            if (self.device().deviceSubType == 16) {
                self.defaultWidth = "half-wide";
            }
            setStatusIcon();
            return true;
        });


        // Check to ensure proxy IP and port values are set.  ThenCreate a new client that subscribes 
        // to the proxy server.  Convert the message to an array
        // and check to ensure the current value isn't equal to the value received from the proxy.
        // If the the value received from the proxy is different then call the function to control the device
        //debugger;
        if (proxyIP && proxyPort) {
            var proxyURL = "http://" + proxyIP + ":" + proxyPort + "/faye";
            var client = new Faye.Client(proxyURL);
            client.subscribe('/homeseer/statuschange', function (message) {
                //debugger;
                var arr = String(message).split(",");
                if (parseInt(arr[1]) == self.ref) {
                    if (self.device().value() != parseInt(arr[2])) {
                        self.device().value(parseInt(arr[2]));
                        $.when(devicecontroller.query({
                            "url": self.url,
                            "ref": self.ref
                        })).done(function (data) {
                            self.device(data);
                            setStatusIcon();
                            return true;
                        });
                    }

                };
            });


        }
    }

    // This runs when the component is torn down. Put here any logic necessary to clean up,
    // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
    HSDWidget.prototype.dispose = function () {};


    return {
        viewModel: HSDWidget,
        template: templateMarkup
    };

});