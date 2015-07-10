define(['knockout', 'text!./refresh.html'], function (ko, templateMarkup) {

    function Refresh(params) {
        self = this;
        self.classInfo = ko.observable();
        if (params.hasOwnProperty("color")) {
            self.defaultColor = params.color;
        } else self.defaultColor = "bg-steel";
        self.classInfo("tile fg-white " + self.defaultColor);        
        self.refresh = function () {
            location.reload(true);
        }
    }

    // This runs when the component is torn down. Put here any logic necessary to clean up,
    // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
    Refresh.prototype.dispose = function () {};

    return {
        viewModel: Refresh,
        template: templateMarkup
    };

});