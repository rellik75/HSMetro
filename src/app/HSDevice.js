/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define(['knockout'], function (ko) {
return function HSDevice(data){
    
       var self = this;

        self.name = ko.observable(data.name);
        self.status = ko.observable(data.status);
        self.statusIcon = ko.observable();
        self.controlValue = ko.observable(0);
        self.controlPairs = ko.observableArray();
        self.controlButtonsVisible = ko.observable(false);
};
});

