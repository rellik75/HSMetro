/************************************ 
Device Types for Thermostats:
    Operating State=1
    Temperature=    2
    Mode_Set=       3
    Fan_Mode_Set=   4
    Fan_Status=     5
    Setpoint=       6
    RunTime=        7
    Hold_Mode=      8
    Operating_Mode= 9
    Root=           99
*************************************/

/************************************ 
Device Setpoint SubTypes for Thermostats:
    Heating=        1
    Cooling=        2
    Furance=        7
    Auto_Change=    10
    EnergySave Heat=11
    EnergySave Cool=12   
*************************************/

/************************************
Device Temp SubTypes for Thermostats:
    Temperature=    0
    Temperature=    1
    Humidity=       5      
*************************************/

define(['jquery', 'knockout', 'devicecontroller', 'text!./hsthermostat.html', 'underscore'], function ($, ko, controller, templateMarkup) {

    function Hsthermostat(params) {
        var self = this;
        var refreshInterval = 300000 //time is in milliseconds.  Currently set to 5 minutes
        self.url = params.url;
        self.ref = params.ref;
        self.setPointControlRef = "";
        self.modeControlRef = "";

        self.classInfo = ko.observable();
        if (params.hasOwnProperty("width")) {
            self.defaultWidth = params.width;
        } else self.defaultWidth = "one-wide two-tall";
        if (params.hasOwnProperty("color")) {
            self.defaultColor = params.color;
        } else self.defaultColor = "steel";

        self.classInfo("live-tile exclude accent " + self.defaultColor + " " + self.defaultWidth);


        self.statusIcon = ko.observable();
        self.device = ko.observable();
        self.children = ko.observableArray();
        self.ambientTemp = ko.observable();
        self.mode = ko.observable();
        self.humidity = ko.observable();
        self.setpoint = ko.observable();
        self.status = ko.observable();
        self.fanStatus = ko.observable();
        self.modeIcon = ko.observable();
        self.humidityIsVisible = ko.observable(false);
        self.controlButtonsAreVisible = ko.observable(true);

        var setStatusIcon = function () {
            var status = self.device().status();

            var _classInfo = "live-tile exclude " + self.defaultWidth;
            switch (status) {

            case "Cool":
            case "Cooling":
            case "On":
                {
                    self.classInfo(_classInfo + " accent blue");
                    break;
                }
            case "Heat":
            case "Heating":
                {
                    self.classInfo(_classInfo + " accent orange");
                    break;
                }
            default:
                {
                    self.classInfo(_classInfo + " accent " + self.defaultColor);
                    break;
                }
            }
        }


        self.rangeUp = function (device, event) {
            //debugger;
            event.stopPropagation();
            var currentVal = String(self.setpoint()).substr(0, 2);
            if (currentVal < 98) {
                currentVal++;
                self.setpoint(currentVal);
            }
            controller.control({
                "ref": self.setPointControlRef,
                "url": self.url,
                "value": 1001
            });
        };

        self.rangeDown = function (device, event) {
            event.stopPropagation();
            var currentVal = String(self.setpoint()).substr(0, 2);
            if (currentVal > 60) {
                currentVal--;
                self.setpoint(currentVal);
            }
            controller.control({
                "ref": self.setPointControlRef,
                "url": self.url,
                "value": 1000
            });
        };

        self.toggleDevice = function (params) {
            if (self.timer != null) {
                clearTimeout(self.timer);
                self.timer = null;
            }
            var o = _.find(self.device().controlPairs(), function (item) {
                return item.Label == self.mode();
            });
            //debugger;
            var i = _.indexOf(self.device().controlPairs(), o);
            ++i;
            if (i >= _.size(self.device().controlPairs())) {
                i = 0;
            }
            //debugger;
            if (_.size(self.device().controlPairs()) > 0) {
                try {
                    var label = self.device().controlPairs()[i].Label;
                    self.mode(label);
                    if (self.mode() == "Cool") {
                        self.modeIcon("img/cool.png");
                    }
                    if (self.mode() == "Heat") {
                        self.modeIcon("img/heat.png");
                    }
                    if (self.mode() == "Heat - Cool") {
                        self.modeIcon("img/heat-cool.png");
                    }
                    if (self.mode() == "Off") {
                        self.modeIcon("img/on_off.png");
                    }
                    self.device().value(self.device().controlPairs()[i].ControlValue);
                    console.log(self.device().value());
                    self.timer = setTimeout(controller.control, 3000, {
                        "ref": self.modeControlRef,
                        "url": self.url,
                        "value": self.device().value()
                    });
                } catch (error) {
                    console.log("Error attempting to toggle device modes.  Most likely this thermostat only has one mode.")
                }
            }
        }

        var query = function () {
            $.when(controller.query({
                "url": self.url,
                "ref": self.ref,
                "isParent": true
            })).done(function (data) {

                self.device(data);
                setStatusIcon(self);
                //debugger;
                if (self.device().statusLabel() == "Offline") {
                    self.controlButtonsAreVisible(false);
                } else {
                    self.controlButtonsAreVisible(true);
                }
                _.each(self.device().children, function (item) {

                    var query = {};
                    query.url = self.url;
                    query.ref = item;
                    $.when(controller.query(query)).done(function (data) {
                        self.children.push(data);
                        //debugger;
                        if (data.deviceType == 2 && (data.deviceSubType == 0 || data.deviceSubType == 1)) {
                            self.ambientTemp(data.statusLabel());
                        }
                        if (data.deviceType == 1) {
                            self.status(data.statusLabel());
                        }
                        if ((data.deviceType == 2 || data.deviceType == 999) && (data.deviceSubType == 5 || data.deviceSubType == 0)) {
                            self.humidity(data.statusLabel());
                            self.humidityIsVisible(true);
                        }
                        if (data.deviceType == 6) {
                            self.setpoint(data.statusLabel());
                            self.device().value(data.value());
                            self.setPointControlRef = data.ref();
                        }
                        if (data.deviceType == 4 || data.deviceType == 5) {
                            self.fanStatus(data.statusLabel());
                        }
                        if (data.deviceType == 3 || data.deviceType == 9) {
                            self.mode(data.statusLabel());
                            ko.utils.arrayPushAll(self.device().controlPairs(), data.controlPairs());
                            self.modeControlRef = data.ref();
                            if (self.mode() == "Cool") {
                                self.modeIcon("img/cool.png");
                            }
                            if (self.mode() == "Heat") {
                                self.modeIcon("img/heat.png");
                            }
                            if (self.mode() == "Heat - Cool") {
                                self.modeIcon("img/heat-cool.png");
                            }
                            if (self.mode() == "Off") {
                                self.modeIcon("img/on_off.png");
                            }
                            //debugger;
                        }
                    });
                });

            });
        }

        var intervalRefresh = setInterval(function () {
            query();
        }, refreshInterval);
        query();
    }


    // This runs when the component is torn down. Put here any logic necessary to clean up,
    // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
    Hsthermostat.prototype.dispose = function () {};

    return {
        viewModel: Hsthermostat,
        template: templateMarkup
    };


});