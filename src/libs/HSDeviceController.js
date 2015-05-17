define(['jquery', 'knockout', 'hsd'], function ($, ko, Device) {

    return {
        query: function (params) {

            var statusData = $.getJSON(params.url + "/JSON?request=getstatus&ref=" + params.ref);      
            return $.when(statusData).then(function (data) {
                var d= data;
                //debugger;
                if (d.Devices[0].device_type.Device_Type!=2 && d.Devices[0].device_type.Device_Type!=99 && d.Devices[0].device_type.Device_Type!=1 &&  d.Devices[0].device_type.Device_Type!=6)
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
        },
        control: function (params) {
            //debugger;
            var controlData = $.getJSON(params.url + "/JSON?request=controldevicebyvalue&ref=" + params.ref + "&value=" + params.value);
            return $.when(controlData).then(function (_cdata) {
                    return true;
                },
                function error(error) {
                    alert("There was an error sending control command to device");
                });
        }
    };
});