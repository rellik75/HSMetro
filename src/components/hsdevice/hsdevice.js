define(['jquery', 'knockout', 'faye', 'text!./hsdevice.html', 'jqueryui', 'touchpunch', 'underscore'], function ($, ko, faye, templateMarkup) {

    function Hsdevice(params) {

        var timer = null;
        var self = this;
        var proxyIP = params.proxyIP;
        var proxyPort = params.proxyPort;
        self.icons = params.icons;


        if (params.hasOwnProperty('ref')) {
            self.ref = params.ref;
        }
        if (params.hasOwnProperty("color")) {
            self.classInfo = ko.observable('live-tile exclude accent ' + params.color);
            self.defaultColor = params.color;
        } else {
            self.defaultColor = "steel";
        }
        self.url = params.url;
        self.name = ko.observable();
        self.value = ko.observable();
        self.status = ko.observable();

        self.statusIcon = ko.observable();
        self.controlValue = ko.observable(0);
        self.controlPairs = ko.observableArray();
        self.controlButtonsVisible = ko.observable(false);
        self.statusLabel = ko.computed(function () {
            var a = self.status();
            if (String(self.status()).match(/Dim/))
                return "Dim " + self.value();
            else
                return self.status();
        });

        self.toggleDevice = function (params) {
            //var newstatus = (self.status() == "On" ? "Off" : "On");
            toggleButton(self);
        };

        queryDevice(self);

        // Check to ensure proxy IP and port values are set.  ThenCreate a new client that subscribes 
        // to the proxy server.  Convert the message to an array
        // and check to ensure the current value isn't equal to the value received from the proxy.
        // If the the value received from the proxy is different then call the function to control the device

        if (proxyIP && proxyPort) {
            var proxyURL = "http://" + proxyIP + ":" + proxyPort + "/faye";
            var client = new Faye.Client(proxyURL);
            client.subscribe('/homeseer/statuschange', function (message) {
                //debugger;
                var arr = String(message).split(",");
                if (parseInt(arr[1]) == self.ref) {
                    if (self.value() != parseInt(arr[2])) {
                        self.value(parseInt(arr[2]));
                        queryDevice(self)
                    }
                }
            });
        }
    }


    // This runs when the component is torn down. Put here any logic necessary to clean up,
    // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
    Hsdevice.prototype.dispose = function () {};


    return {
        viewModel: Hsdevice,
        template: templateMarkup
    };
});

function toggleButton(self) {
    if (self.timer != null) {
        clearTimeout(self.timer);
        self.timer = null;
    }
    var o = _.find(self.controlPairs(), function (item) {
        //debugger;
        return item.Label == self.status();
    });
    //debugger;
    var i = _.indexOf(self.controlPairs(), o);
    ++i;
    if (i >= _.size(self.controlPairs())) {
        i = 0
    };
    //debugger;
    var label = self.controlPairs()[i].Label;
    if (self.controlPairs()[i].Range != null) {
        self.controlButtonsVisible(true);
        if (self.value() > self.controlPairs()[i].Range.RangeEnd) {
            self.value(self.controlPairs()[i].Range.RangeEnd);
        }
    } else
        self.controlButtonsVisible(false);
    //debugger; 
    self.status(label);
    self.value(self.controlPairs()[i].ControlValue);
    self.timer = setTimeout(controlDeviceByValue, 3000, self);
}



function queryDevice(self) {
    //debugger;
    var controlData = $.getJSON(self.url + "/JSON?request=getcontrol&ref=" + self.ref);
    var statusData = $.getJSON(self.url + "/JSON?request=getstatus&ref=" + self.ref);
    $.when(controlData, statusData).done(function (_cdata, _sdata) {
        //debugger;
        var data = $.extend(_cdata[0], _sdata[0]);
        // $.getJSON(url, null, function (data) {
        self.name(data.Devices[0].name);
        self.status(data.Devices[0].status);
        self.value(data.Devices[0].value);
        setStatusIcon(self);
        //debugger;
        _.each(data.ControlPairs, function (item) {
            self.controlPairs.push(item)
        });
    });
};


function controlDeviceByValue(self) {
    //debugger;
    var val = self.value();
    //debugger;
    var controlData = $.getJSON(self.url + "/JSON?request=controldevicebyvalue&ref=" + self.ref + "&value=" + val);
    var statusData = $.getJSON(self.url + "/JSON?request=getstatus&ref=" + self.ref);

    $.when(controlData, statusData).done(function (_cdata, _sdata) {
        //debugger;
        var data = $.extend(_cdata[0], _sdata[0]);
        self.status(data.Devices[0].status);
        setStatusIcon(self);
    });
}

function setStatusIcon(self) {
    var iconPath;
    var status = self.status();

    if (String(status).match(/Dim/)) {
        status = "On";
    }
    if (String(status).match(/On/)) {
        status = "On";
    }
    if (String(status).match(/Lock/)) {
        status = "Locked";
    }
    if (String(status).match(/Unlock/)) {
        status = "Unlocked";
    }
    if (self.icons) {
        iconPath = self.icons[status.toLowerCase()];
    }

    switch (self.status()) {
    case "Locked":
    case "Lock":
    case "On Last Level":
    case ((String(self.status()).toLowerCase().match(/dim/)) ? self.status() : "undefined"):
    case "On":
        {
            self.classInfo("live-tile exclude accent green");
            self.statusIcon(self.url + iconPath);
            break;
        }
    case "Away":
        {
            self.classInfo("live-tile exclude accent mauve");
            self.statusIcon(self.url + iconPath);
            break;
        }
    case "Night":
        {
            self.classInfo("live-tile exclude accent orange");
            self.statusIcon(self.url + iconPath);
            break;
        }
    case "Arm":
    case "Armed":
        {
            self.classInfo("live-tile exclude accent red");
            self.statusIcon(self.url + iconPath);
            break;
        }
    case "Unknown":
    case "Unlock":
    case "Unlocked":
    case "Off":
    case "Home":
    case "Disarm":
    case "Disarmed":
    default:
        {
            self.classInfo("live-tile exclude accent " + self.defaultColor);
            self.statusIcon(self.url + iconPath);
            break;
        }
    }
}

function rangeUp(self, event) {
    event.stopPropagation();
    var currentVal = self.value();
    if (currentVal < 98) {
        if ((currentVal + 10) < 98) {
            if (currentVal === 1) {
                self.value(10);
            } else
                self.value(currentVal + 10);
        } else {
            self.value(98);
        }
    }
    controlDeviceByValue(self);
}

function rangeDown(self, event) {
    event.stopPropagation();
    var currentVal = self.value();
    if (currentVal >= 1) {
        if ((currentVal - 10) > 1) {
            self.value(currentVal - 10);
        } else {
            self.value(1);
        }
    }
    controlDeviceByValue(self);
}