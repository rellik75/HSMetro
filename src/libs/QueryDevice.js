define(['jquery','knockout','hsd'], function ($,ko, device) {

   return{ 
    query:function (params) { 
            var controlData = $.getJSON(params.url + "/JSON?request=getcontrol&ref=" + params.ref);
            var statusData = $.getJSON(params.url + "/JSON?request=getstatus&ref=" + params.ref);
             return $.when(controlData, statusData).then(function (_cdata, _sdata) {
                var data = $.extend(_cdata[0], _sdata[0]);
                return new device(data);           
            });
        }
    };
   
});


 