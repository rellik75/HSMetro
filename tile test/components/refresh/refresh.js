define(['knockout', 'text!./refresh.html'], function (ko, templateMarkup) {

    function Refresh(params) {
        self = this;
        var color=params.color;
        //self.classInfo=ko.observable("live-tile exclude accent " + color);
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