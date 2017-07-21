const VERSION = '0.1.17';
const CACHE = 'static' + VERSION;

self.addEventListener('install', function(evt) {
    evt.waitUntil(precache()
        .then(() => self.skipWaiting())
    );
});

self.addEventListener('fetch', function(evt) {
    evt.respondWith(fromNetwork(evt.request, 400).catch(function() {
        return fromCache(evt.request);
    }));
});

function precache() {
    return caches.open(CACHE).then(function(cache) {
        return cache.addAll([
            './index.html'
        ]);
    });
}

function fromNetwork(request, timeout) {
    return new Promise(function(fulfill, reject) {

        var timeoutId = setTimeout(reject, timeout);

        fetch(request).then(function(response) {
            clearTimeout(timeoutId);
            fulfill(response);

        }, reject);
    });
}

function fromCache(request) {
    return caches.open(CACHE).then(function(cache) {
        return cache.match(request).then(function(matching) {
            return matching || Promise.reject('no-match');
        });
    });
}