// require.js looks for the following global when initializing
var require = {
    config: {
        'config':{
            //*****ONLY EDIT THESE THREE VARIABLES TO POINT TO YOUR HOMESEER SYSTEM******//
            url:'http://192.168.1.250', //The URL to your HomeSeer server
            proxyIP: '192.168.1.250',   //The IP address of the server running the proxy
            proxyPort: '8000',           //The PORT the UI will connect to.  Default is 6512
            zipcode: '89135'
        }
    },
    baseUrl: ".",
    paths: {
        "jquery":               "bower_modules/jquery/dist/jquery.min",
        "bootstrap":            "bower_modules/components-bootstrap/js/bootstrap.min",
        "crossroads":           "bower_modules/crossroads/dist/crossroads.min",
        "hasher":               "bower_modules/hasher/dist/js/hasher.min",
        "knockout":             "bower_modules/knockout/dist/knockout",
        "knockout-projections": "bower_modules/knockout-projections/dist/knockout-projections.min",
        "signals":              "bower_modules/js-signals/dist/signals.min",
        "text":                 "bower_modules/requirejs-text/text",
        "simpleweather":        "bower_modules/libs/jQuery.simpleWeather.min",
        "underscore":           "bower_modules/underscore/underscore-min",
        "faye":                 "bower_modules/faye-browser-min",
        "devicecontroller":     "bower_modules/libs/HSDeviceController",
        "eventcontroller":      "bower_modules/libs/HSEventController",
        "hsd":                  "bower_modules/libs/HSDevice",
        "config":               "bower_modules/libs/Config",
        "bluebird":             "bower_modules/bluebird/js/browser/bluebird.min",
        "metrojs":              "bower_modules/metro/build/js/metro"
    },
    shim: {
        "bootstrap": { deps: ["jquery"] },
        "metrojs": {deps: ["jquery"]},
    }
};
