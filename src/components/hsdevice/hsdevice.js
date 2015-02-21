define(['jquery', 'knockout', 'knockout-mapping', 'metrojs', 'text!./hsdevice.html', 'jqueryui', 'touchpunch', 'underscore'], function ($, ko, komapping, metrojs,  templateMarkup) {

    function Hsdevice(params) {
        ko.mapping = komapping;
        var ref=params.ref;
        var url=params.url;
        var timer=null;
        var tilecolor=params.color;
        var metrojs = $.fn.metrojs;
        var self = this;
        self.name = ko.observable();
        self.status = ko.observable();
        self.statusIcon=ko.observable();
        self.controlPairs=ko.observableArray();
        //debugger;
        
        metrojs.theme.applyTheme('light', 'blue');
        
        //Loop through each tile and assign the HomeSeer Reference Value in the ID attribute
        var elements = $(templateMarkup);
        elements=$(".live-tile");
        $.each(elements, function(index, item) {
            //debugger;
            if (item.id=="") {item.id=ref};           
        });
        
        //Assign each the color parameter to the tile
        $("#"+ref).attr('class', 'live-tile exclude accent ' +tilecolor);
        
        //Function to toggle device on/off
        self.toggleDevice = function (params) {
            //var newstatus = (self.status() == "On" ? "Off" : "On");
            //controlDeviceByLabel(url,ref,newstatus,self);
            test(url,ref,self);
        };
        
        self.test=function(params){
        }
        //debugger;
        queryDevice(url,ref,self);
    }


    // This runs when the component is torn down. Put here any logic necessary to clean up,
    // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
    Hsdevice.prototype.dispose = function () {};


    return {
        viewModel: Hsdevice,
        template: templateMarkup
    };
});

    function test(url, refererence, self) {
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
        //debugger; 
        self.status(label);
        self.timer = setTimeout(controlDeviceByLabel, 3000, [url, refererence, self]);
    }



function queryDevice(url, reference, self) {
   // debugger;
    var controlData = $.getJSON(url+ "/JSON?request=getcontrol&ref=" + reference);
    var statusData = $.getJSON(url + "/JSON?request=getstatus&ref=" + reference);
    $.when(controlData, statusData).done(function (_cdata, _sdata) {
        var data = $.extend(_cdata[0], _sdata[0]);
   // $.getJSON(url, null, function (data) {
        //device(new deviceInfo(data.Devices[0]));
        //debugger;
        self.name(data.Devices[0].name);
        self.status(data.Devices[0].status);
        /*switch (self.status()){   
                case "On":{
                    iconURL=iconURL+"/images/HomeSeer/status/on.gif"
                    $("#"+reference).attr('class', 'live-tile exclude accent green' );
                    break;
                }
                case "On Last Level":{
                    iconURL=iconURL+"/images/HomeSeer/status/on.gif"
                    $("#"+reference).attr('class', 'live-tile exclude accent green' );
                    break;
                }                
                case "Unlocked":{
                    iconURL=iconURL+"/images/HomeSeer/status/unlocked.gif"
                    $("#"+reference).attr('class', 'live-tile exclude accent yellow' ); 
                    break;
                }
                case "Locked": {
                    iconURL=iconURL+"/images/HomeSeer/status/locked.gif";
                    $("#"+reference).attr('class', 'live-tile exclude accent green' ); 
                    break;    
                }
                case "Off": {
                    iconURL=iconURL+"/images/HomeSeer/status/off.gif";
                    $("#"+reference).attr('class', 'live-tile exclude accent steel' );  
                    break;
                }
        }*/
        
        self.statusIcon(getStatusIcon(self.status(),url, reference));
        //debugger;
        _.each(data.ControlPairs, function(item) {
            if (item.Range==null) {
                self.controlPairs.push(item)
            }
        });
    });
};


function controlDeviceByLabel(url, ref, self) {
    var baseURL = url[0];
    var self=url[2];
    var ref=url[1];
    //debugger;
    //url = url + "/JSON?request=controldevicebylabel&ref=" + ref + "&label=" + label;
    var controlData = $.getJSON(baseURL+ "/JSON?request=controldevicebylabel&ref=" + ref + "&label=" + self.status());
    var statusData = $.getJSON(baseURL + "/JSON?request=getstatus&ref=" + ref);
    $.when(controlData, statusData).done(function (_cdata, _sdata) {
        var data = $.extend(_cdata[0], _sdata[0]);        
       self.statusIcon(getStatusIcon(self.status(),baseURL, ref));
    });
    
}

function getStatusIcon(status, url, ref){
        switch (status){   
                case "On Last Level":
                case "On":{
                    url=url+"/images/HomeSeer/status/on.gif";
                    $("#"+ref).attr('class', 'live-tile exclude accent green' );
                    break;
                }
                case "Unknown":
                case "Unlock":
                case "Unlocked":{
                    url=url+"/images/HomeSeer/status/unlocked.gif";
                    $("#"+ref).attr('class', 'live-tile exclude accent yellow' ); 
                    break;
                }
                case "Lock":
                case "Locked": {
                    url=url+"/images/HomeSeer/status/locked.gif";
                    $("#"+ref).attr('class', 'live-tile exclude accent green' ); 
                    break;    
                }
                case "Off": {
                    url=url+"/images/HomeSeer/status/off.gif";
                    $("#"+ref).attr('class', 'live-tile exclude accent steel' );  
                    break;
                }
        }    
    return url;
}