// require.js looks for the following global when initializing
var require = {
    baseUrl: ".",
    paths: {
        "bootstrap":            "libs/bootstrap.min",
        "crossroads":           "libs/crossroads.min",
        "hasher":               "libs/hasher.min",
        "jquery":               "libs/jquery.min",
        "knockout":             "libs/knockout",
        "knockout-projections": "libs/knockout-projections.min",
        "signals":              "libs/signals.min",
        "text":                 "libs/text",
        "metrojs":              "libs/MetroJs.min",
        "jqueryui":             "libs/jquery-ui.min",
        //"knockout-mapping":     "bower_modules/knockout/dist/knockout.mapping",
        "simpleweather":        "libs/jQuery.simpleWeather.min",
        "touchpunch":           "libs/jquery.ui.touch-punch.min",
        "underscore":           "libs/underscore-min",
        "faye":                 "libs/faye-browser-min",
        "devicecontroller":     "libs/HSDeviceController",
        "hsd":                  "libs/HSDevice",
       "jquerymobile":         	"libs/jquery.mobile-1.4.5.min"
    },
    shim: {
        "bootstrap": { deps: ["jquery"] },
        //"knockout.mapping": ["knockout"],
        "jquery.ui.touch-punch": ["jquery", "jquery-ui.min"],
        "MetroJS.min":["jquery"]
    }
};
