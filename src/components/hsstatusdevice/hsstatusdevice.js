define(['jquery', 'knockout', 'devicecontroller', 'hsd', 'config','text!./hsstatusdevice.html', 'faye'], function ($, ko, devicecontroller, device, config,templateMarkup) {

    function Hsstatusdevice(params) {
        var self = this;
        self.refreshInteraval="";
        if (params.hasOwnProperty("refresh")) {
            self.refreshInteraval = params.refresh;
        }

        var proxyIP = config.proxyIP;
        var proxyPort = config.proxyPort;


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
        self.url = config.url;
        self.device = ko.observable();
        self.statusIcon = ko.observable();
        self.iconIsVisible=ko.observable(true);
        
      self.setStatusIcon = function () {
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
                 self.statusIcon(self.url + iconPath); 
            } else
                self.iconIsVisible(false);
                
                
           // self.statusIcon(self.url + iconPath);    
            status=String(status).toLocaleLowerCase();
            switch (status) {

            case "locked":
            case "lock":
            case "closed":
            case "ok":
            case "on last level":
                //case ((String(device.status()).toLowerCase().match(/dim/)) ? device.status() : "undefined"):
            case "on":
                {
                    self.classInfo(_classInfo + " accent green" );
                    break;
                }
            case "away":
                {
                    self.classInfo(_classInfo + " accent mauve");
                    break;
                }
            case "night":
            case "heat":
            case "heating":
                {
                    self.classInfo(_classInfo + " accent orange");
                    break;
                }
            case "cool":
            case "cooling":
                {
                    self.classInfo(_classInfo + " accent cyan");
                    break;                     
                }
            case "arm":
            case "armed":
            case "emergency":
            case "glass breakage":
            case "intrusion":
                {
                    self.classInfo(_classInfo + " accent red");
                    break;
                }
            case "unlock":
            case "unlocked":
            case "opened":
            case "open":
            case "warning":
            case "motion":
                {
                    self.classInfo(_classInfo + " accent orange");
                    break;
                }
            case "unknown":
            case "off":
            case "home":
            case "disarm":
            case "disarmed":
            case "idle":
            default:
                {
                    self.classInfo(_classInfo + " accent " + self.defaultColor);
                    break;
                }
            }
        }        

        self.query = function () {
            $.when(devicecontroller.query({
                "url": self.url,
                "ref": self.ref
            })).done(function (data) {
                self.device(data);
                self.setStatusIcon();
                return true;
            });
        }
        if (self.refreshInteraval!="" && self.refreshInteraval > 0 ) {
            self.intervalRefresh = setInterval(function () {
                self.query();
            }, self.refreshInterval);
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
                //debugger;
                var arr = String(message).split(",");
                if (parseInt(arr[1]) == self.ref) {
                    if (self.device().value() != parseInt(arr[2])) {
                        self.device().value(parseInt(arr[2]));
                        self.query();
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

