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

define(['jquery', 'knockout', 'devicecontroller', 'config', 'bluebird', 'text!./hsthermostat.html', 'underscore', 'faye'], function ($, ko, controller, config, Promise, templateMarkup) {

    function Hsthermostat(params) {
        var self = this;
        var refreshInterval = 300000 //time is in milliseconds.  Currently set to 5 minutes
        var unit = "";
        var proxyPort = config.proxyPort;
        var proxyIP = config.proxyIP;
        var HEATING_MODE = 1;
        var COOLING_MODE = 2;
        var AUTO_CHANGE_OVER_MODE = 3;
        var ESH_MODE = 11;
        var OFF = 0;
        var COOL_ICON = "img/cool.png";
        var HEAT_ICON = "img/heat.png";
        var OFF_ICON = "img/on_off.png";
        var ENERGY_SAVE_ICON = "img/energy_save.png";
        var AUTO_CHANGEOVER_ICON = "img/heat-cool.png";
        var COOL_COLOR = "bg-darkCyan";
        var COOLING_COLOR = "bg-darkBlue"
        var HEAT_COLOR = "bg-darkOrange";
        var HEATING_COLOR = "bg-orange"
        var ESH_COLOR = "bg-amber";
        var AUTO_CHANGE_OVER_COLOR = "bg-violet";
        var OFF_COLOR="bg-gray";
        
        self.url = config.url;

        self.ref = params.ref;
        // self.setPointControlRef = "";
        self.coolSetPointControlRef = ko.observable();
        self.heatSetPointControlRef = ko.observable();
        self.ESHSetpointControlRef = ko.observable();
        self.operatingStatusControlRef = ko.observable();
        self.modeControlRef = ko.observable();
        self.currentModeValue = ko.observable();
        self.ambientControlRef = ko.observable();
        self.humidityControlRef = ko.observable();
        self.rootControlRef = ko.observable(self.ref);


        self.statusIcon = ko.observable();
        self.device = ko.observable();
        self.children = ko.observableArray();
        self.ambientTemp = ko.observable();
        self.mode = ko.observable();
        self.modeValue = ko.observable();
        self.humidity = ko.observable();
        self.coolSetPoint = ko.observable();
        self.heatSetPoint = ko.observable();
        self.ESHSetPoint = ko.observable();
        self.systemStatus = ko.observable();
        self.operatingStatus = ko.observable();
        self.fanStatus = ko.observable();
        self.valveStatus = ko.observable();
        self.batteryStatus = ko.observable();
        self.batteryIsVisible = ko.observable(false);
        self.valveIsVisible = ko.observable(false);
        self.humidityIsVisible = ko.observable(false);
        self.pendingIsVisible = ko.observable(false);
        self.controlButtonsAreVisible = ko.observable(true);
        self.setPointIsVisible = ko.observable(true);
        self.pendingModeValue = ko.observable(null);
        self.setpoint = ko.pureComputed({
            read: function () {
                if (self.pendingModeValue() == null) {
                    if (self.modeValue() == OFF) {
                        return "";
                    } else if (self.modeValue() == HEATING_MODE) {
                        return self.heatSetPoint();
                    } else if (self.modeValue() == ESH_MODE) {
                        return self.ESHSetPoint();
                    } else if (self.modeValue() == COOLING_MODE) {
                        return self.coolSetPoint();
                    } else if (self.modeValue() == AUTO_CHANGE_OVER_MODE) {
                        //*********TO DO********//
                    } else return self.heatSetPoint();
                } else {
                    if (self.pendingModeValue() == OFF) {
                        return "";
                    } else if (self.pendingModeValue() == HEATING_MODE) {
                        return self.heatSetPoint();
                    } else if (self.pendingModeValue() == ESH_MODE) {
                        return self.ESHSetPoint();
                    } else if (self.pendingModeValue() == COOLING_MODE) {
                        return self.coolSetPoint();
                    } else if (self.pendingModeValue() == AUTO_CHANGE_OVER_MODE) {
                        //*********TO DO********//
                    } else return self.heatSetPoint();
                }
            },
            write: function (value) {
                if (self.modeValue() == HEATING_MODE) {
                    self.heatSetPoint(value);
                } else if (self.modeValue() == ESH_MODE) {
                    self.ESHSetPoint(value);
                } else if (self.modeValue() == COOLING_MODE) {
                    self.coolSetPoint(value);
                } else if (self.modeValue() == AUTO_CHANGE_OVER_MODE) {
                    //*********TO DO********//
                } else self.heatSetPoint(value)
            }
        });
        self.setPointControlRef = ko.computed(function () {
            if (self.pendingModeValue() == null) {
                if (self.modeValue() == OFF) {
                    return "";
                } else if (self.modeValue() == HEATING_MODE) {
                    return self.heatSetPointControlRef();
                } else if (self.modeValue() == ESH_MODE) {
                    return self.ESHSetpointControlRef();
                } else if (self.modeValue() == COOLING_MODE) {
                    return self.coolSetPointControlRef();
                } else if (self.modeValue() == AUTO_CHANGE_OVER_MODE) {
                    //*********TO DO********//
                } else return self.heatSetPointControlRef();
            } else {
                if (self.pendingModeValue() == OFF) {
                    return "";
                } else if (self.pendingModeValue() == HEATING_MODE) {
                    return self.heatSetPointControlRef();
                } else if (self.pendingModeValue() == ESH_MODE) {
                    return self.ESHSetpointControlRef();
                } else if (self.pendingModeValue() == COOLING_MODE) {
                    return self.coolSetPointControlRef();
                } else if (self.pendingModeValue() == AUTO_CHANGE_OVER_MODE) {
                    //*********TO DO********//
                } else return self.heatSetPointControlRef();
            }
        });
        self.modeIcon = ko.computed(function () {
            if (self.pendingModeValue() == null) {
                if (self.modeValue() == HEATING_MODE) {
                    return HEAT_ICON;
                } else if (self.modeValue() == ESH_MODE) {
                    return ENERGY_SAVE_ICON;
                } else if (self.modeValue() == COOLING_MODE) {
                    return COOL_ICON;
                } else if (self.modeValue() == OFF) {
                    return OFF_ICON
                } else if (self.modeValue() == AUTO_CHANGE_OVER_MODE) {
                    return AUTO_CHANGEOVER_ICON;
                }
                //else return HEAT_ICON;
            } else {
                if (self.pendingModeValue() == HEATING_MODE) {
                    return HEAT_ICON;
                } else if (self.pendingModeValue() == ESH_MODE) {
                    return ENERGY_SAVE_ICON;
                } else if (self.pendingModeValue() == COOLING_MODE) {
                    return COOL_ICON;
                } else if (self.pendingModeValue() == OFF) {
                    return OFF_ICON;
                } else if (self.pendingModeValue() == AUTO_CHANGE_OVER_MODE) {
                    return AUTO_CHANGEOVER_ICON;
                }
                //else return HEAT_ICON;
            }
        });
        self.classInfo = ko.observable();
        if (params.hasOwnProperty("color")) {
            self.defaultColor = params.color;
        } else self.defaultColor = "bg-steel";
        self.classInfo("tile tile-wide-x fg-white " + self.defaultColor);

        self.locationIsVisible=ko.observable();
        if (params.hasOwnProperty("locationIsVisible")){
            self.locationIsVisible(params.locationIsVisible);
        } else self.locationIsVisible(true); 
        
        self.setTileColor = function () {
            var _classInfo = "tile tile-wide-x fg-white ";
            if (self.pendingModeValue() == null) {
                if (self.modeValue() == OFF) {
                    self.defaultColor=OFF_COLOR;
                    self.classInfo(_classInfo + OFF_COLOR);
                } else if (self.modeValue() == HEATING_MODE) {
                    self.defaultColor = HEAT_COLOR;
                    self.classInfo(_classInfo + HEAT_COLOR);
                } else if (self.modeValue() == ESH_MODE) {
                    self.defaultColor = ESH_COLOR;
                    self.classInfo(_classInfo + ESH_COLOR);
                } else if (self.modeValue() == COOLING_MODE) {
                    self.defaultColor = COOL_COLOR;
                    self.classInfo(_classInfo + COOL_COLOR);
                } else if (self.modeValue() == AUTO_CHANGE_OVER_MODE) {
                    self.defaultColor = AUTO_CHANGE_OVER_COLOR;
                    self.classInfo(_classInfo + AUTO_CHANGE_OVER_COLOR);
                }
            } else {
                if (self.pendingModeValue() == HEATING_MODE) {
                    self.classInfo(_classInfo + HEAT_COLOR);
                } else if (self.pendingModeValue() == ESH_MODE) {
                    self.classInfo(_classInfo + ESH_COLOR);
                } else if (self.pendingModeValue() == COOLING_MODE) {
                    self.classInfo(_classInfo + COOL_COLOR);
                } else if (self.pendingModeValue() == OFF) {
                    self.classInfo(_classInfo + OFF_COLOR);
                } else if (self.pendingModeValue() == AUTO_CHANGE_OVER_MODE) {
                    self.classInfo(_classInfo + AUTO_CHANGE_OVER_COLOR);
                }
            }
            if (self.operatingStatus() == "Cooling") {
                self.classInfo(_classInfo + COOLING_COLOR);
            } else if (self.operatingStatus() == "Heating") {
                self.classInfo(_classInfo + HEATING_COLOR);
            } /*else {
                self.classInfo(_classInfo + self.defaultColor);
            }*/
        }



        self.rangeUp = function (device, event) {
            event.stopPropagation();
            self.pendingIsVisible(true);
            if (self.timer != null) {
                clearTimeout(self.timer);
                self.timer = null;
            }
            var currentVal = String(self.setpoint()).substr(0, 2);

            if ((unit == "F" && currentVal < 98) || (unit == "C" && currentVal < 90)) {
                currentVal++;
                self.setpoint(currentVal + "\xB0");
            }
            self.timer = setTimeout(controller.control, 3000, {
                "ref": self.setPointControlRef(),
                "url": self.url,
                "value": currentVal
            });
        };

        self.rangeDown = function (device, event) {
            //if (event.target.id="down"){}
            event.stopPropagation();
            self.pendingIsVisible(true);
            if (self.timer != null) {
                clearTimeout(self.timer);
                self.timer = null;
            }
            var currentVal = String(self.setpoint()).substr(0, 2);
            console.log("Current Mode = " + self.mode());

            if ((unit == "F" && currentVal > 60) || (unit == "C" && currentVal > 10)) {
                currentVal--;
                self.setpoint(currentVal + "\xB0");
            }
            self.timer = setTimeout(controller.control, 3000, {
                "ref": self.setPointControlRef(),
                "url": self.url,
                "value": currentVal
            });
        };

        //FUNCTION toggleDevice
        self.toggleDevice = function (params) {
            if (self.timer != null) {
                clearTimeout(self.timer);
                self.timer = null;
            }
            console.log("Current Mode Value = " + self.modeValue());

            //Find the current Mode value in the array of ControlPairs
            var o = _.find(self.device().controlPairs(), function (item) {
                return item.Label == self.mode();
            });

            //Get the index value of the current Mode value in the array of ControlPairs and then increment to move
            //to the next label in the array.  If we reach the end of the array, set the index to 0 and start over
            var i = _.indexOf(self.device().controlPairs(), o);
            ++i;
            if (i >= _.size(self.device().controlPairs())) {
                i = 0;
            }
            //debugger;
            if (_.size(self.device().controlPairs()) > 0) {

                try {
                    var label = self.device().controlPairs()[i].Label;
                    self.pendingModeValue(self.device().controlPairs()[i].ControlValue);
                    self.mode(label);
                    self.setTileColor();
                    self.timer = setTimeout(controlThermostat, 3000, {
                        "ref": self.modeControlRef(),
                        "url": self.url,
                        "value": self.pendingModeValue()
                    });

                } catch (error) {
                    console.log("Error attempting to toggle device modes.  Most likely this thermostat only has one mode.")
                }
            }
        }

        var controlThermostat = function (params) {
            self.pendingIsVisible(true);
            publishToProxy({
                "pendingModeValue": params.value,
                "pendingIsVisible": true,
                "refID": self.modeControlRef(),
                "setpoint": self.setpoint(),
                // "controlButtonsAreVisible": self.controlButtonsAreVisible(),
                "setPointIsVisible": self.setPointIsVisible(),
                "setPointControlRef": self.setPointControlRef()
            });
            console.log("Pending Mode Value = " + self.pendingModeValue());
            //self.modeValue(params.value);
            $.when(controller.control(params)).done(function (data) {
                queryThermostat();
            });;
        }

        //FUNCTION queryThermostat
        var queryThermostat = function () {
            Promise.resolve(controller.query({
                "url": self.url,
                "ref": self.ref,
                "isParent": true
            })).then(function (data) {
                self.device(data);
                //debugger;
                if (self.device().statusLabel() == "Offline") {
                    self.setPointIsVisible(false);
                } else {
                    self.setPointIsVisible(true);
                }
                _.each(self.device().children, function (item) {
                    queryChild(item);
                });
            })
        }

        //FUNCTION queryChild
        var queryChild = function (item) {
                var query = {};
                query.url = self.url;
                query.ref = item;
                return Promise.resolve(controller.query(query)).then(function (data) {
                    self.children.push(data);
                    //debugger;
                    if (data.deviceType == 2 && (data.deviceSubType == 0 || data.deviceSubType == 1)) {
                        self.ambientTemp(data.statusLabel().substr(0, 2) + "\xB0");
                        self.ambientControlRef(data.ref());
                    }
                    if (data.deviceType == 1) {
                        self.operatingStatus(data.statusLabel());
                        self.operatingStatusControlRef(data.ref());
                        self.setTileColor();
                    }
                    if ((data.deviceType == 2 && data.deviceSubType == 5) || (data.deviceType == 999 && data.deviceSubType == 0)) {
                        self.humidity(data.statusLabel());
                        self.humidityIsVisible(true);
                        self.humidityControlRef(data.ref());
                    }
                    if (data.deviceType == 3 || data.deviceType == 9) {
                        //debugger;
                        self.mode(data.statusLabel());
                        self.modeValue(data.value());
                        self.setTileColor();
                        console.log("HS Mode Value = " + self.modeValue());
                        ko.utils.arrayPushAll(self.device().controlPairs(), data.controlPairs());
                        self.modeControlRef(data.ref());

                        if (self.pendingModeValue() == null) {
                            if (self.modeValue() == OFF) {
                                self.setPointIsVisible(false);
                            } else if (self.device().statusLabel() != "Offline") {
                                self.setPointIsVisible(true);
                            }
                        } else
                        if (self.pendingModeValue() == OFF) {
                            self.setPointIsVisible(false);
                        }
                    }
                    if (data.deviceType == 6) {
                        unit = String(data.statusLabel().substr(-1, 1));
                        if (data.deviceSubType == 1) {
                            //Setpoint RefID for Heating Child
                            self.heatSetPointControlRef(data.ref());
                            self.heatSetPoint(data.statusLabel().substr(0, 2) + "\xB0");
                            console.log("Heat setpoint ref= " + data.ref());
                            console.log("Heat setpoint = " + data.statusLabel().substr(0, 2) + "\xB0" + unit);
                        } else if (data.deviceSubType == 11) {
                            //Setpoint REFID for Energy Save Heat Child
                            self.ESHSetpointControlRef(data.ref());
                            self.ESHSetPoint(data.statusLabel().substr(0, 2) + "\xB0");
                            console.log("Energy Save Heat setpoint ref= " + data.ref());
                        } else if (data.deviceSubType == 2) {
                            //Setpoint RefID for Cooling Child
                            self.coolSetPointControlRef(data.ref());
                            self.coolSetPoint(data.statusLabel().substr(0, 2) + "\xB0");
                            console.log("Cool setpoint ref= " + data.ref());
                            console.log("Cool setpoint = " + data.statusLabel().substr(0, 2) + "\xB0" + unit);
                        }

                    }
                    if (data.deviceType == 4 || data.deviceType == 5) {
                        self.systemStatus(data.statusLabel());
                    }

                    if (data.deviceType == 0 && data.deviceSubType == 128) {
                        //**BATTERY**//
                        self.batteryStatus(data.value() + "%");
                        self.batteryIsVisible(true);

                    }
                    if (data.deviceType == 0 && data.deviceSubType == 38) {
                        //**MULTI-LEVEL SWITCH**//
                        self.valveStatus(data.status());
                        self.valveIsVisible(true);
                    }
                });
            }
            /*$.when.apply( null, queryThermostat() ).done(function() {
                console.log("loop complete");
                self.pendingIsVisible(false);
            })*/
        queryThermostat();

        //FUNCTION subscribeToProxy
        var subscribeToProxy = function () {
            var proxyURL = "http://" + proxyIP + ":" + proxyPort + "/faye";
            var client = new Faye.Client(proxyURL);
            client.subscribe('/homeseer/statuschange', function (message) {
                var arr = String(message).split(",");
                var refID = parseInt(arr[1]);
                console.log("Proxy Broadcast message received for device: " + arr[1]);
                //debugger;
                if (refID == self.setPointControlRef() || refID == self.modeControlRef() ||
                    refID == self.ambientControlRef() || refID == self.humidityControlRef() || refID == self.operatingStatusControlRef() || refID == self.rootControlRef()) {
                    console.log("Proxy Broadcast match--doing query");
                    var q = $.when(queryChild(refID)).done(function (data) {
                        console.log("query complete for refID " + refID);
                        self.pendingIsVisible(false);
                    });

                };
            });
            client.subscribe('/homeseer/hsthermostat/' + self.ref, function (message) {
                console.log("Broadcast message received from a hsthermostat widget");
                var modeControlRef = message.refID;
                var setPointControlRef = message.setPointControlRef;
                if (setPointControlRef == self.setPointControlRef() || modeControlRef == self.modeControlRef()) {
                    console.log("Message ID is a match.  Displaying hourglass");
                    self.pendingIsVisible(message.pendingIsVisible);
                    //self.modeIcon(message.modeIcon);
                    //self.pendingModeValue(message.pendingModeValue);
                    //self.setpoint(message.setpoint);
                    //self.setPointIsVisible(message.setPointIsVisible);
                    //self.controlButtonsAreVisible(message.controlButtonsAreVisible);
                    //self.setPointControlRef(message.setPointControlRef);
                }

            });
        }

        var publishToProxy = function (data) {
            var proxyURL = "http://" + proxyIP + ":" + proxyPort + "/faye";
            var client = new Faye.Client(proxyURL);
            var publication = client.publish('/homeseer/hsthermostat/' + self.ref, data);
            publication.then(function () {
                console.log('Message received by server!');
            }, function (error) {
                console.log('Error sending message to proxy server: ' + error.message);
            });
        }

        // Check to ensure proxy IP and port values are set.  ThenCreate a new client that subscribes 
        // to the proxy server.  Convert the message to an array
        // and check to ensure the current value isn't equal to the value received from the proxy.
        // If the the value received from the proxy is different then call the function to control the device
        //debugger;
        if (proxyIP && proxyPort) {
            subscribeToProxy();
        }

    }


    // This runs when the component is torn down. Put here any logic necessary to clean up,
    // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
    Hsthermostat.prototype.dispose = function () {};

    return {
        viewModel: Hsthermostat,
        template: templateMarkup
    };


});