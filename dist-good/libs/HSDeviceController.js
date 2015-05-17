define(['jquery', 'knockout', 'hsd'], function ($, ko, Device) {

    return {
        query: function (params) {

            var statusData = $.getJSON(params.url + "/JSON?request=getstatus&ref=" + params.ref);
            
            return $.when(statusData).then(function (data) {
                var d= data;
                //debugger;
                if (d.Devices[0].device_type.Device_Type!=2 && d.Devices[0].device_type.Device_Type!=99 && d.Devices[0].device_type.Device_Type!=1)
                {
                    var controlData = $.getJSON(params.url + "/JSON?request=getcontrol&ref=" + params.ref);
                    return $.when(controlData).then(function (_cdata) {
                        var data = $.extend(_cdata, d);
                        //debugger;
                        return new Device(data);
                    })
                }
                else return new Device(d);
            });

            /*if (!params.hasOwnProperty("isParent")) {
                debugger;
                var controlData = $.getJSON(params.url + "/JSON?request=getcontrol&ref=" + params.ref);
                return $.when(statusData, controlData).then(function (_sdata, _cdata) {
                        var data = $.extend(_cdata[0], _sdata[0]);
                        return new device(data);
                    },
                    function error(error) {
                    debugger;
                        //alert("There was an error retrieving device data from HomeSeer");
                    }
                );
            } else {
                return $.when (statusData).then (function (_sdata){
                    return new device(_sdata);
                })

            }*/
        },
        control: function (params) {
            //debugger;
            var controlData = $.getJSON(params.url + "/JSON?request=controldevicebyvalue&ref=" + params.ref + "&value=" + params.value);
            //var statusData = $.getJSON(params.url + "/JSON?request=getstatus&ref=" + params.ref);

            return $.when(controlData).then(function (_cdata) {
                    //debugger;
                    //var data = $.extend(_cdata[0], _sdata[0]);
                    //device.status(data.Devices[0].status);
                    return true;
                },
                function error(error) {
                    alert("There was error an sending control command to device");
                });
        }
    };
});