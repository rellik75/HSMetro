define(['knockout', 'text!./webpage.html', 'underscore'], function (ko, templateMarkup) {

    function Webpage(params) {
        var self = this;
        self.sites = params.sites;
        self.sites.push({
            site: '',
            url: ''
        });
        self.timer = null;
        self.siteName = ko.observable();
        self.icon = ko.observable();
        self.iconIsVisible = ko.observable(false);

        self.classInfo = ko.observable();
        if (params.hasOwnProperty("color")) {
            self.defaultColor = params.color;
        } else self.defaultColor = "bg-steel";
        self.classInfo("tile fg-white " + self.defaultColor);

        self.delay = 3000;
        if (params.hasOwnProperty("delay")) {
            self.delay = params.delay;
        }

        self.navigateToSite = function (url) {
            window.location.href = url;
        }

        self.toggleSite = function () {
            if (self.timer != null) {
                clearTimeout(self.timer);
                self.timer = null;
            }
            var o = _.find(self.sites, function (item) {
                return item.site == self.siteName();
            });
            var i = _.indexOf(self.sites, o);
            ++i;
            if (i >= _.size(self.sites)) {
                i = 0;
            }
            //debugger;
            self.siteName(self.sites[i].site);
            if (self.sites[i].url != '') {
                //self.icon("http://www.google.com/s2/favicons?domain=http://" + self.sites[i].url)
                self.icon("http://www.google.com/s2/favicons?domain=" + self.sites[i].url)
                self.iconIsVisible(true);

                self.timer = setTimeout(function (url) {
                        window.location.href = "http://" + url;
                    }, self.delay,
                    self.sites[i].url
                );
            } else self.iconIsVisible(false);

        }
    }

    // This runs when the component is torn down. Put here any logic necessary to clean up,
    // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
    Webpage.prototype.dispose = function () {};

    return {
        viewModel: Webpage,
        template: templateMarkup
    };

});