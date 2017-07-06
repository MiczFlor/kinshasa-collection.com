(function() {

    'use strict';

    var VERSION = '0.1';
    var iframeTrailerSrc = document.querySelector('#trailer-dialog iframe').getAttribute('src');

    // Function to animate the scroll
    var smoothScroll = function(anchor, duration) {

        // Calculate how far and how fast to scroll
        var startLocation = window.pageYOffset;
        var endLocation = anchor.offsetTop + 40;
        var distance = endLocation - startLocation;
        var increments = distance / (duration / 16);
        var stopAnimation;

        // Scroll the page by an increment, and check if it's time to stop
        var animateScroll = function() {
            window.scrollBy(0, increments);
            stopAnimation();
        };

        // If scrolling down
        if (increments >= 0) {
            // Stop animation when you reach the anchor OR the bottom of the page
            stopAnimation = function() {
                var travelled = window.pageYOffset;
                if ((travelled >= (endLocation - increments)) || ((window.innerHeight + travelled) >= document.body.offsetHeight)) {
                    clearInterval(runAnimation);
                }
            };
        }
        // If scrolling up
        else {
            // Stop animation when you reach the anchor OR the top of the page
            stopAnimation = function() {
                var travelled = window.pageYOffset;
                if (travelled <= (endLocation || 0)) {
                    clearInterval(runAnimation);
                }
            };
        }

        // Loop the animation function
        var runAnimation = setInterval(animateScroll, 16);

    };

    // Define smooth scroll links
    var scrollToggle = document.querySelectorAll('nav a');

    // For each smooth scroll link
    [].forEach.call(scrollToggle, function(toggle) {

        // When the smooth scroll link is clicked
        toggle.addEventListener('click', function(e) {

            // Prevent the default link behavior
            e.preventDefault();

            // Get anchor link and calculate distance from the top
            var dataID = toggle.getAttribute('href');
            var dataTarget = document.querySelector(dataID);
            var dataSpeed = toggle.getAttribute('data-speed') || 500;

            // If the anchor exists
            if (dataTarget) {
                // Scroll to the anchor
                smoothScroll(dataTarget, dataSpeed);
            }

        }, false);

    });

    var trailerDialogEl = document.getElementById('trailer-dialog');
    var mainEl = document.querySelector('header');

    // Instantiate a new A11yDialog module
    var trailerDialog = new A11yDialog(trailerDialogEl, mainEl);

    trailerDialog.on('show', function(dialogEl, triggerEl) {
        dialogEl.querySelector('iframe').setAttribute('src', iframeTrailerSrc);
    });

    trailerDialog.on('hide', function(dialogEl, triggerEl) {
        var iframeSrc = dialogEl.querySelector('iframe').getAttribute('src');
        iframeTrailerSrc = iframeSrc;
        dialogEl.querySelector('iframe').setAttribute('src', '');
    });

    // video controls
    var videoState = document.querySelector('[data-status]');
    var videoVolume = document.querySelector('[data-volume]');
    var videoElement = document.querySelector('video');

    videoState.addEventListener('click', function() {
        var currentState = this.dataset.status;
        console.log(currentState);
        if (currentState === 'play') {
            this.dataset.status = 'pause';
            this.textContent = 'Play video';
            videoElement.pause();
        } else {
            this.dataset.status = 'play';
            this.textContent = 'Stop video';
            videoElement.play();
        }
    });

    videoVolume.addEventListener('click', function() {
        var volume = this.dataset.volume;

        if (volume === 'on') {
            this.dataset.volume = 'off';
            this.textContent = 'Volume off';
            videoElement.muted = false;
        } else {
            this.dataset.volume = 'on';
            this.textContent = 'Volume on';
            videoElement.muted = true;
        }
    });

    // plotline
    var activePlotline = document.querySelector('[data-active]');
    var plotlineButtons = document.querySelectorAll('[data-plotline-show]');

    [].forEach.call(plotlineButtons, function(plotlineButton) {
        plotlineButton.addEventListener('click', function() {
            var plotlineToShow = this.dataset.plotlineShow;
            var newPlotline = document.querySelector('[data-plotline="' + plotlineToShow + '"]');
            activePlotline = document.querySelector('[data-active]');

            activePlotline.removeAttribute('data-active');
            newPlotline.setAttribute('data-active', true);

        });
    });

    // mobile nav
    var viewportWidth = window.innerWidth;

    if (viewportWidth < 960) {
        var menuTrigger = document.querySelector(['[data-trigger="menu"]']);

        menuTrigger.removeAttribute('hidden');
        document.body.classList.add('size-small');

        menuTrigger.addEventListener('click', function() {
            document.body.classList.toggle('menu-open');
        });
    }


    console.log('JavaScript file with version v' + VERSION + ' loaded with no errors!1')

})();