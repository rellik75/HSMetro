define(['jquery', 'knockout', 'hsd', 'bluebird'], function ($, ko, Device, Promise) {

    return {
        query: function (params) {
            var sdata;
            return new Promise.resolve($.getJSON(params.url + "/JSON?request=getstatus&ref=" + params.ref)).then(function (data) {
                sdata = data;
                return $.getJSON(params.url + "/JSON?request=getcontrol&ref=" + params.ref);
            }).then(function (cdata) {
                return cdata;
            }).catch(function (e) {
                console.log(params.ref + " device is not controllable");
                return "";
            }).then(function (cdata) {
                return new Device($.extend(cdata, sdata));
            })
        },
        control: function (params) {
            //debugger;
            var controlData = $.getJSON(params.url + "/JSON?request=controldevicebyvalue&ref=" + params.ref + "&value=" + params.value);
            return Promise.resolve(controlData).then(function (_cdata) {
                return true;
            }).catch(function error(error) {
                alert("There was an error sending control command to device");
            })
        }
    };
})