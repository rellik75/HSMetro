define(['knockout', 'text!./weather.html', 'simpleweather','jquery','metrojs'], function (ko, templateMarkup, simpleweather) {

    function Weather(params) {
        var self = this;
        var refreshInterval = 18000000 //time is in milliseconds.  Currently set to 1 hour
        var zipcode=params.zipcode;
        var location=params.location;
        if (zipcode) {
            location=zipcode;
        }        
        var color=params.color;
        self.classInfo=ko.observable("live-tile two-wide two-tall exclude accent " + color);
        self.image=ko.observable();
        self.status=ko.observable();
        self.temp=ko.observable();
        self.units=ko.observable();
        self.currently=ko.observable();
        self.city=ko.observable();
        self.windDirection=ko.observable();
        self.windSpeed=ko.observable();
        self.humidity=ko.observable();
        self.description=ko.observable();
        self.forecast=ko.observableArray()();
        var getWeather=function() {
        $.simpleWeather({
            location: location,
            unit: 'f',
            success: function (weather) {
                self.image(weather.image);
                self.status(weather.text);
                self.temp(weather.temp);
                self.units(weather.units.temp);
                self.currently(weather.currently);
                self.city(weather.title);
                self.windDirection(weather.wind.direction);
                self.windSpeed(weather.wind.speed);
                self.humidity(weather.humidity);
                self.description(weather.description);
                self.forecast.push(weather.forecast);
                //debugger;
            },
            error: function (error) {
                //debugger;
                alert(error.message);
            }
        })
        }
        getWeather();
        var intervalRefresh = setInterval(function () {
            getWeather();
        }, refreshInterval);       
    }

    // This runs when the component is torn down. Put here any logic necessary to clean up,
    // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
    Weather.prototype.dispose = function () {};

    return {
        viewModel: Weather,
        template: templateMarkup
    };

});