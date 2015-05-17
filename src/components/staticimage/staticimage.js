define(['knockout', 'text!./staticimage.html', 'config'], function (ko, templateMarkup,config) {

    function StaticImage(params) {
        var self = this;
        self.refreshInterval = 30000 //time is in milliseconds.  Currently set to 5 min
        if (params.hasOwnProperty("refresh")) {
            self.refreshInterval = params.refresh;
        }
        var randomID = Math.floor((Math.random() * 10000) + 1);
        self.imagePath = params.imageName;

        self.url = config.url;
        self.classInfo = ko.observable();

        if (params.hasOwnProperty("width")) {
            self.defaultWidth = params.width;
        } else self.defaultWidth = "one-wide";
        if (params.hasOwnProperty("height")) {
            self.defaultHeight = params.height;
        } else self.defaultHeight = "one-tall";
        if (params.hasOwnProperty("color")) {
            self.defaultColor = params.color;
        } else self.defaultColor = "steel";

        self.classInfo("live-tile " + self.defaultWidth + " " + self.defaultHeight + " exclude accent " + self.defaultColor);
        self.image = ko.observable(new Image());
        self.id = ko.observable(randomID);
        self.image(self.url + self.imagePath + "?v=" + self.id() + new Date().getTime());

        self.intervalRefresh = setInterval(function () {
            self.image(self.url + self.imagePath + "?v=" + self.id() + new Date().getTime());
        }, self.refreshInterval);


    }

    // This runs when the component is torn down. Put here any logic necessary to clean up,
    // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
    StaticImage.prototype.dispose = function () {};

    return {
        viewModel: StaticImage,
        template: templateMarkup
    };

});