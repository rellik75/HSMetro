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
            { url: '',          	params: { page: 'home-page' } },
            { url: 'master_br',     params: { page: 'master_br' } },
            { url: 'kitchen',     	params: { page: 'kitchen' } },
            { url: 'hallway',     	params: { page: 'hallway' } },
            { url: 'guest_room',    params: { page: 'guest_room' } },
            { url: 'media_room',    params: { page: 'media_room' } },
            { url: 'office',     	params: { page: 'office' } },
            { url: 'patio',         params: { page: 'patio' } },
            { url: 'den',           params: { page: 'den' } },
            { url: 'bedroom_1',     params: { page: 'bedroom_1' } },
            { url: 'bedroom_2',     params: { page: 'bedroom_2' } },
            { url: 'bedroom_3',     params: { page: 'bedroom_3' } },
            { url: 'study',         params: { page: 'study' } },
            { url: 'entry',         params: { page: 'entry' } },
            { url: 'garage',        params: { page: 'garage' } },
            { url: 'dining_room',   params: { page: 'dining_room' } },
            { url: 'outside',       params: { page: 'outside' } },
            { url: 'living_room',   params: { page: 'living_room' } },
            { url: 'family_room',   params: { page: 'family_room' } },
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