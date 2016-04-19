/**Adding a brand new page to the nav bar:
Add a new line in the navBarItems and navBarLabels section--following the sequetion numbering convention.  In the navBarItems section,
select true to display your new page, or false to hide it.  In the navBarLabels section, specify the text you want to appear
in the nav bar.

Edit Startup.js and add a new line in the "Pages" section that will point to your new page. 
ko.components.register('<page name?', {require: 'pages/<page folder>/<page name>'});

Edit Router.js and add a new route that points to your new page
{ url: '<number you entered in navBarItems>',     	    params: { page: '<page name>' } }

Copy and paste a page folder from within the the "pages" subfolder.  Rename the .js and .html file to match the page name you specified
router.js and startup.js.  Edit the .js file so that the "define" section includes a reference to your new html file.  Rename the 
ViewModel function to match your new page name (ie, MyPageViewModel).  Update the return variable to reference your renamed function.
*/
var require = {
    config: {
        'config': {
            //*****ONLY EDIT THESE THREE VARIABLES TO POINT TO YOUR HOMESEER SYSTEM******//
            url: 'http://192.168.1.250', //The URL to your HomeSeer server
            proxyIP: '192.168.1.250', //The IP address of the server running the proxy
            proxyPort: '8000', //The PORT the UI will connect to.  Default is 6512
            zipcode: '89135',

            //*****TOGGLE NAV BAR ITEMS HERE******//
            navBarItems: {
                "1": true,
                "2": true,
                "3": true,
                "4": true,
                "5": true,
                "6": true,
                "7": true,
                "8": true,
                "9": true,
                "10": true,
                "11": true,
                "12": true,
                "13": true,
                "14": true,
                "15": true,
                "16": true,
                "17": true,
                "18": true,
            },
            //*****RELABEL NAV BAR ITEMS HERE******//
            navBarLabels: {
                "main": "Home",
                "1": "Master Bedroom",
                "2": "Kitchen",
                "3": "Hallway",
                "4": "Guest Room",
                "5": "Media Room",
                "6": "Office",
                "7": "Patio",
                "8": "Den",
                "9": "Bedroom 1",
                "10": "Bedroom 2",
                "11": "Studio",
                "12": "Study",
                "13": "Entry",
                "14": "Garage",
                "15": "Dining Room",
                "16": "Outside",
                "17": "Living Room",
                "18": "Family Room",

            }
        }
    },
    //*****DO NOT EDIT BELOW THIS POINT******//
    baseUrl: ".",
    paths: {
        "jquery":               "libs/jquery.min",
        "bootstrap":            "libs/bootstrap.min",
        "crossroads":           "libs/crossroads.min",
        "hasher":               "libs/hasher.min",
        "knockout":             "libs/knockout",
        "knockout-projections": "libs/knockout-projections.min",
        "signals":              "libs/signals.min",
        "text":                 "libs/text",
        "simpleweather":        "libs/jQuery.simpleWeather.min",
        "underscore":           "libs/underscore-min",
        "faye":                 "libs/faye-browser-min",
        "devicecontroller":     "libs/HSDeviceController",
        "eventcontroller":      "libs/HSEventController",
        "hsd":                  "libs/HSDevice",
        "config":               "libs/Config",
        "bluebird":             "libs/bluebird.min",
        "metrojs":              "libs/metro",
        "pageLayout":           "libs/page_layout"
    },
    shim: {
        "bootstrap": {deps: ["jquery"]},
        "metrojs": {deps: ["jquery"]},
    }
};