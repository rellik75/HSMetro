define(['jquery', 'knockout'], function ($, ko) {

    return {
        runEvent: function (params) {
            var eventData = $.getJSON(params.url + "/JSON?request=runevent&group=" + params.group + "&name=" + params.event);
            return $.when(eventData).then(function (_edata) {
                return true;
            })
        }
    }
})