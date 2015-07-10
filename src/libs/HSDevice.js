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

define(['knockout', 'config'], function (ko,config) {


    return function device(data) {
        var self = this;
        var url = config.url;
        self.deviceName = ko.observable(data.Devices[0].name);
        self.value = ko.observable(data.Devices[0].value);
        self.status = ko.observable(data.Devices[0].status);
        self.deviceType=ko.observable(data.Devices[0].device_type.Device_Type);
        self.deviceSubType=ko.observable(data.Devices[0].device_type.Device_SubType);
        self.location=ko.observable(data.Devices[0].location);
        self.location2=ko.observable(data.Devices[0].location2);
        self.ref=ko.observable(data.Devices[0].ref);
        self.statusIcon = ko.observable();
        self.controlValue = ko.observable(0);
        self.controlPairs = ko.observableArray();
        if (data.hasOwnProperty("ControlPairs")){
            //debugger;
            Array.prototype.move = function (from, to) {
                this.splice(to, 0, this.splice(from, 1)[0]);
            };
            //Rearrange the values for Dimmer Controls to move "Off" to the front of the array
            if (data.ControlPairs.length>=3){
                data.ControlPairs.move(2,0);
            }
            ko.utils.arrayPushAll(self.controlPairs, data.ControlPairs);
            
        }
        self.statusImage=ko.computed(function () {
             return url + "/" + data.Devices[0].status_image;
        });
        self.statusLabel = ko.computed(function () {
            if (String(self.status()).match(/Dim/))
                return  self.value();
            else if (self.status()=="No Status") {
                    return "";
             }
            else 
                return self.status().replace(/(\r\n|\n|\r)/gm,"");
        });
        self.relationship=ko.observable(data.Devices[0].relationship);
        self.children=[];
        //if (self.relationship==2)
            ko.utils.arrayPushAll(self.children, data.Devices[0].associated_devices);

    };
});
   
    
    




