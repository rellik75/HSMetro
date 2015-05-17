define(['jquery', 'knockout', 'devicecontroller', 'hsd', 'text!./hsstatusdevice.html', 'faye'], function ($, ko, devicecontroller, device, templateMarkup) {

    function Hsstatusdevice(params) {
        var self = this;
        var refreshInterval = 300000 //time is in milliseconds.  Currently set to 5 minutes

        var proxyIP = params.proxyIP;
        var proxyPort = params.proxyPort;


        self.classInfo = ko.observable();
        if (params.hasOwnProperty("width")) {
            self.defaultWidth = params.width;
        } else self.defaultWidth = "one-wide";
        if (params.hasOwnProperty("color")) {
            self.defaultColor = params.color;
        } else self.defaultColor = "steel";

        self.classInfo("live-tile exclude accent " + self.defaultColor + " " + self.defaultWidth);

        self.icons = params.icons;
        self.ref = params.ref;
        self.url = params.url;
        self.device = ko.observable();
        self.statusIcon = ko.observable();
        
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
            case "Closed":
            case "On Last Level":
                //case ((String(device.status()).toLowerCase().match(/dim/)) ? device.status() : "undefined"):
            case "On":
                {
                    self.classInfo(_classInfo + " accent green" );
                    break;
                }
            case "Away":
                {
                    self.classInfo(_classInfo + " accent mauve");
                    break;
                }
            case "Night":
                {
                    self.classInfo(_classInfo + " accent orange");
                    break;
                }
            case "Arm":
            case "Armed":
                {
                    self.classInfo(_classInfo + " accent red");
                    break;
                }
            case "Unlock":
            case "Unlocked":
            case "Opened":
                {
                    self.classInfo(_classInfo + " accent orange");
                    break;
                }
            case "Unknown":
            case "Off":
            case "Home":
            case "Disarm":
            case "Disarmed":
            default:
                {
                    self.classInfo(_classInfo + " accent " + self.defaultColor);
                    break;
                }
            }
        }        

        var query = function () {
            $.when(devicecontroller.query({
                "url": self.url,
                "ref": self.ref
            })).done(function (data) {
                self.device(data);
                setStatusIcon();
                return true;
            });
        }
        var intervalRefresh = setInterval(function () {
            query();
        }, refreshInterval);
        query();



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
                }
            });
        }
    }

    // This runs when the component is torn down. Put here any logic necessary to clean up,
    // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
    Hsstatusdevice.prototype.dispose = function () {};

    return {
        viewModel: Hsstatusdevice,
        template: templateMarkup
    };

});

