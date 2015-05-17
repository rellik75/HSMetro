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
        "bootstrap":            "bower_modules/components-bootstrap/js/bootstrap.min",
        "crossroads":           "bower_modules/crossroads/dist/crossroads.min",
        "hasher":               "bower_modules/hasher/dist/js/hasher.min",
        "jquery":               "bower_modules/jquery/dist/jquery.min",
        "knockout":             "bower_modules/knockout/dist/knockout",
        "knockout-projections": "bower_modules/knockout-projections/dist/knockout-projections.min",
        "signals":              "bower_modules/js-signals/dist/signals.min",
        "text":                 "bower_modules/requirejs-text/text",
        "metrojs":              "bower_modules/libs/MetroJs.min",
        "jqueryui":             "bower_modules/jquery/dist/jquery-ui.min",
        "simpleweather":        "bower_modules/libs/jQuery.simpleWeather.min",
        //"touchpunch":           "bower_modules/libs/jquery.ui.touch-punch.min",
        "underscore":           "bower_modules/underscore/underscore-min",
        "faye":                 "bower_modules/faye-browser-min",
        "devicecontroller":     "bower_modules/libs/HSDeviceController",
        "eventcontroller":      "bower_modules/libs/HSEventController",
        "hsd":                  "bower_modules/libs/HSDevice",
        "jquerymobile":         "bower_modules/libs/jquery.mobile-1.4.5.min",
        "config":               "bower_modules/libs/Config"
    },
    shim: {
        "bootstrap": { deps: ["jquery"] },
        "MetroJS.min":["jquery"]
    }
};
