// require.js looks for the following global when initializing
var require = {
    baseUrl: ".",
    paths: {
        "bootstrap":            "bower_modules/components-bootstrap/js/bootstrap.min",
        "crossroads":           "bower_modules/crossroads/dist/crossroads.min",
        "hasher":               "bower_modules/hasher/dist/js/hasher.min",
        "jquery":               "bower_modules/jquery/dist/jquery",
        "knockout":             "bower_modules/knockout/dist/knockout.debug",
        "knockout-projections": "bower_modules/knockout-projections/dist/knockout-projections",
        "signals":              "bower_modules/js-signals/dist/signals.min",
        "text":                 "bower_modules/requirejs-text/text",
        "metrojs":              "bower_modules/libs/MetroJs.min",
        "jqueryui":             "bower_modules/jquery/dist/jquery-ui.min",
        //"knockout-mapping":     "bower_modules/knockout/dist/knockout.mapping",
        "simpleweather":        "bower_modules/libs/jQuery.simpleWeather",
        "touchpunch":           "bower_modules/libs/jquery.ui.touch-punch",
        "underscore":           "bower_modules/underscore/underscore-min",
        "faye":                 "bower_modules/faye-browser-min",
        "devicecontroller":     "bower_modules/libs/HSDeviceController",
        "hsd":                  "bower_modules/libs/HSDevice",
        "jquerymobile":         "bower_modules/libs/jquery.mobile-1.4.5.min"
    },
    shim: {
        "bootstrap": { deps: ["jquery"] },
        //"knockout.mapping": ["knockout"],
        "jquery.ui.touch-punch": ["jquery", "jquery-ui.min"],
        "MetroJS.min":["jquery"]
    }
};
