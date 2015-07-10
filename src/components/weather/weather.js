define(['knockout', 'text!./weather.html', 'simpleweather'], function (ko, templateMarkup, simpleweather) {

    function Weather(params) {
        var self = this;
        var refreshInterval = 18000000; //time is in milliseconds.  Currently set to 1 hour
        if (params.hasOwnProperty("refresh")) {
            refreshInteraval = params.refresh;
        }
        var unit="f";
        if (params.hasOwnProperty("unit")){
           unit=params.unit; 
        }
        if (params.hasOwnProperty("color")) {
            self.color = params.color;
        } else self.color = "bg-steel";
        
        var zipcode=params.zipcode;
        var location=params.location;
        if (zipcode) {
            location=zipcode;
        }        

        self.classInfo=ko.observable("tile-large fg-white " + self.color);
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
        self.region=ko.observable();
        self.tomorrow=ko.observable();
        self.today=ko.observable();
        var getWeather=function() {
        $.simpleWeather({
            location: location,
            unit: unit,
            success: function (weather) {
                self.image(weather.image);
                self.status(weather.text);
                self.temp(weather.temp + "\xB0 " + weather.units.temp);
                self.units(weather.units.temp);
                self.currently(weather.currently);
                self.city(weather.city);
                self.region(weather.region);
                self.windDirection(weather.wind.direction);
                self.windSpeed(weather.wind.speed);
                self.humidity(weather.humidity);
                self.description(weather.description);
                self.forecast.push(weather.forecast);
                self.tomorrow(weather.forecast[1].low + "\xB0" + "/" + weather.forecast[1].high + "\xB0" + " " + weather.forecast[1].text);
                self.today(weather.low + "\xB0" + "/" + weather.high + "\xB0" + " " + weather.text);
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