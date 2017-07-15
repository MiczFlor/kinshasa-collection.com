const VERSION = '0.1.13';
const CACHE = 'static' + VERSION;

self.addEventListener('install', function(evt) {
    event.waitUntil(precache()
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
            './index.html',
            './build/js/webfontloader.js',
            './build/js/load.js',
            './build/js/vimeo-player.js',
            './build/js/a11y-dialog.js',
            './build/js/main.js',
            './build/media/map.svg',
            './build/media/episode-1.jpg',
            './build/media/episode-2.jpg',
            './build/media/episode-3.jpg',
            './build/media/episode-4.jpg',
            './build/media/episode-5.jpg'
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