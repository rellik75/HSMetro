define(["knockout", "crossroads", "hasher"], function (ko, crossroads, hasher) {

    // This module configures crossroads.js, a routing library. If you prefer, you
    // can use any other routing library (or none at all) as Knockout is designed to
    // compose cleanly with external libraries.
    //
    // You *don't* have to follow the pattern established here (each route entry
    // specifies a 'page', which is a Knockout component) - there's nothing built into
    // Knockout that requires or even knows about this technique. It's just one of
    // many possible ways of setting up client-side routes.

    return new Router({
        routes: [
            { url: '',              params: { page: 'home-page' } },
            { url: '1',             params: { page: 'master_br' } },
            { url: '2',     	    params: { page: 'kitchen' } },
            { url: '3',     	    params: { page: 'hallway' } },
            { url: '4',             params: { page: 'guest_room' } },
            { url: '5',             params: { page: 'media_room' } },
            { url: '6',     	    params: { page: 'office' } },
            { url: '7',             params: { page: 'patio' } },
            { url: '8',             params: { page: 'den' } },
            { url: '9',             params: { page: 'bedroom_1' } },
            { url: '10',            params: { page: 'bedroom_2' } },
            { url: '11',            params: { page: 'bedroom_3' } },
            { url: '12',            params: { page: 'study' } },
            { url: '13',            params: { page: 'entry' } },
            { url: '14',            params: { page: 'garage' } },
            { url: '15',            params: { page: 'dining_room' } },
            { url: '16',            params: { page: 'outside' } },
            { url: '17',            params: { page: 'living_room' } },
            { url: '18',            params: { page: 'family_room' } },
        ]
    });

    function Router(config) {
        var currentRoute = this.currentRoute = ko.observable({});

        ko.utils.arrayForEach(config.routes, function (route) {
            crossroads.addRoute(route.url, function (requestParams) {
                currentRoute(ko.utils.extend(requestParams, route.params));
            });
        });

        activateCrossroads();
    }

    function activateCrossroads() {
        function parseHash(newHash, oldHash) {
            crossroads.parse(newHash);
        }
        crossroads.normalizeFn = crossroads.NORM_AS_OBJECT;
        hasher.initialized.add(parseHash);
        hasher.changed.add(parseHash);
        hasher.init();
    }
});