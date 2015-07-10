define(['jquery', 'knockout', 'devicecontroller', 'config', 'bluebird', 'text!./hsdevice.html', 'underscore', 'faye'], function ($, ko, devicecontroller, config, Promise, templateMarkup) {

    function HSDWidget(params) {
        //$.mobile.loadingMessage = false;
        var self = this;
        self.timer = null;
        var proxyIP=config.proxyIP;
        var proxyPort=config.proxyPort;

        self.classInfo = ko.observable();
        if (params.hasOwnProperty("color")) {
            self.defaultColor = params.color;
        } else self.defaultColor = "bg-steel";
        self.classInfo("tile fg-white " + self.defaultColor);

        self.locationIsVisible=ko.observable();
        if (params.hasOwnProperty("locationIsVisible")){
            self.locationIsVisible(params.locationIsVisible);
        } else self.locationIsVisible(true);
        
        self.ref = params.ref;
        self.url=config.url;
        self.device = ko.observable();
        self.statusIcon = ko.observable();
        self.iconIsVisible=ko.observable(true);
        self.controlButtonsVisible = ko.observable(false);

        self.toggleDevice = function (params) {
            var pendingValue=null;
            if (self.timer != null) {
                clearTimeout(self.timer);
                self.timer = null;
            }
            //var newstatus = (self.status() == "On" ? "Off" : "On");
            var o = _.find(self.device().controlPairs(), function (item) {
                return item.Label == self.device().status();
            });
            
            var i = _.indexOf(self.device().controlPairs(), o);
            ++i;
            if (i >= _.size(self.device().controlPairs())) {
                i = 0;
            }
            var label = self.device().controlPairs()[i].Label;
            if (self.device().controlPairs()[i].Range != null) {
                self.controlButtonsVisible(true);
                if (self.device().value() > self.device().controlPairs()[i].Range.RangeEnd) {
                    //self.device().value(self.device().controlPairs()[i].Range.RangeEnd);
                    pendingValue=self.device().controlPairs()[i].Range.RangeEnd;
                }
                else {
                    pendingValue=self.device().controlPairs()[i].Range.RangeStart;
                }
            } else{
                //self.device().value(self.device().controlPairs()[i].ControlValue);
                pendingValue=self.device().controlPairs()[i].ControlValue;
                self.controlButtonsVisible(false);
            }
                
            self.device().status(label); 
            self.timer = setTimeout(devicecontroller.control, 3000, {
                "ref": self.ref,
                "url": self.url,
                "value": pendingValue
            });
            setStatus();
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

        var setStatus = function () {
            var status = self.device().status();
            
            var _classInfo="tile fg-white  ";

            if (String(status).match(/Dim/)) {
                status = "On";
                //self.device().status(self.device().status().replace("Dim"," "));
                self.controlButtonsVisible(true);
            } else if (String(status).match(/On/)) {
                status = "On";
            } else if (String(status).match(/Lock/)) {
                status = "Locked";
            } else if (String(status).match(/Unlock/)) {
                status = "Unlocked";
            } else if (String(status).match(/Open/)) {
                status = "Opened";
            } else if (String(status).match(/Close/)) {
                status = "Closed";
            } else if (String(status).match(/Off/)) {
                status = "Off";
                self.controlButtonsVisible(false);
            }
                
                
            switch (status) {

            case "Locked":
            case "Lock":
            case "On Last Level":
                //case ((String(device.status()).toLowerCase().match(/dim/)) ? device.status() : "undefined"):
            case "On":
                {
                    self.classInfo(_classInfo + " bg-green" );
                    break;
                }
            case "Away":
                {
                    self.classInfo(_classInfo + " bg-mauve");
                    break;
                }
            case "Night":
                {
                    self.classInfo(_classInfo + " bg-orange");
                    break;
                }
            case "Arm":
            case "Armed":
                {
                    self.classInfo(_classInfo + " bg-red");
                    break;
                }
            case "Unlock":
            case "Unlocked":
            case "Opened":
            case "Open":        
                {
                    self.classInfo(_classInfo + " bg-orange");
                    break;
                }
            case "Unknown":
            case "Off":
            case "Home":
            case "Disarm":
            case "Disarmed":
            default:
                {
                    self.classInfo(_classInfo + self.defaultColor);
                    break;
                }
            }
        }
        
        self.query = function () {
            Promise.resolve(devicecontroller.query({
                "url": self.url,
                "ref": self.ref
            })).then(function (data) {
                self.device(data);
                setStatus();
                return true;
            });
        }
        
        self.query();



        // Check to ensure proxy IP and port values are set.  ThenCreate a new client that subscribes 
        // to the proxy server.  Convert the message to an array
        // and check to ensure the current value isn't equal to the value received from the proxy.
        // If the the value received from the proxy is different then call the function to control the device
        //debugger;
        if (proxyIP && proxyPort) {
            var proxyURL = "http://" + proxyIP + ":" + proxyPort + "/faye";
            var client = new Faye.Client(proxyURL);
            client.subscribe('/homeseer/statuschange', function (message) {
                var arr = String(message).split(",");
                if (parseInt(arr[1]) == self.ref) {
                    if (self.device().value() != parseInt(arr[2])) {
                        self.device().value(parseInt(arr[2]));
                        self.query();
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