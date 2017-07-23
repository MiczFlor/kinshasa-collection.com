(function() {

    'use strict';

    var VERSION = '0.2';

    // Function to animate the scroll
    var smoothScroll = function(anchor, duration) {

        // Calculate how far and how fast to scroll
        var startLocation = window.pageYOffset;
        var endLocation = anchor.offsetTop + 40;
        var distance = endLocation - startLocation;
        var increments = distance / (duration / 16);
        var stopAnimation;

        if (anchor.id === 'top') {
            endLocation = anchor.offsetTop;
        }

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
    var scrollToggle = document.querySelectorAll('[data-smooth-scroll]');

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

    // trailer dialog
    var trailerDialog = new A11yDialog(trailerDialogEl, mainEl);
    var videoIframeElement = document.querySelector('.dialog-content video');

    var vimeoOptions = {
        id: 226337671
    };

    var vimeoPlayer = new Vimeo.Player('vimeo-iframe', vimeoOptions);


    trailerDialog.on('show', function(dialogEl, triggerEl) {
        vimeoPlayer.play();
    });

    trailerDialog.on('hide', function(dialogEl, triggerEl) {
        vimeoPlayer.pause();
    });

    // protagonists
    var protagonistsElements = document.querySelectorAll('.protagonists-list li');

    [].forEach.call(protagonistsElements, function(protagonistsElement) {
        protagonistsElement.addEventListener('click', function() {
            [].forEach.call(protagonistsElements, function(protagonistsElement) {
                protagonistsElement.classList.remove('hover');
            });
            this.classList.add('hover');
        });

        protagonistsElement.addEventListener('mouseover', function() {
            this.click();
        });
    });

    // video controls
    var videoState = document.querySelector('[data-status]');
    var videoVolume = document.querySelector('[data-volume]');
    var videoElement = document.querySelector('video');
    var videoElements = document.querySelectorAll('video');

    [].forEach.call(videoElements, function(video) {
        video.setAttribute('src', 'https://player.vimeo.com/external/226285539.hd.mp4?s=1a99a0274bd77c0d77bf67375bb5a1415f41530c&profile_id=175');
    });

    videoState.addEventListener('click', function() {
        var currentState = this.dataset.status;

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

        if (volume === 'off') {
            this.dataset.volume = 'on';
            this.textContent = 'Volume on';
            videoElement.muted = false;
        } else {
            this.dataset.volume = 'off';
            this.textContent = 'Volume off';
            videoElement.muted = true;
        }
    });

    // plotline
    var timerPlotline;
    var plotlineStarted = false;
    var activePlotline = document.querySelector('[data-active]');
    var plotlineButtons = document.querySelectorAll('[data-plotline-show]');
    var activeCityPath = document.querySelectorAll('path[data-active]');

    var changePlotlines = function(plotline) {
        var plotlineToShow = plotline.dataset.plotlineShow;
        var city = plotline.dataset.city;
        var newPlotline = document.querySelector('[data-plotline="' + plotlineToShow + '"]');
        var cityPath = document.querySelector('[data-city-path="' + city + '"]');
        var cityPoint = document.querySelector('[data-city-point="' + city + '"]');
        var cityPlane = document.querySelector('[data-city-plane="' + city + '"]');
        var activeButton = document.querySelector('[data-active-button]') || false;
        activeCityPath = document.querySelectorAll('[data-active]');

        if (plotlineToShow == 4) {
            document.querySelector('[data-city-plane="kinshasa"]').classList.add('revert');
        } else {
            document.querySelector('[data-city-plane="kinshasa"]').classList.remove('revert');
        }

        if (activeCityPath) {
            [].forEach.call(activeCityPath, function(path) {
                path.removeAttribute('data-active');
            });
        }

        if (activeButton) {
            [].forEach.call(plotlineButtons, function(button) {
                button.removeAttribute('data-active-button');
            });

        }

        plotline.setAttribute('data-active-button', true);

        cityPath.setAttribute('data-active', true);
        cityPoint.setAttribute('data-active', true);
        cityPlane.setAttribute('data-active', true);
        newPlotline.setAttribute('data-active', true);
    };

    [].forEach.call(plotlineButtons, function(plotlineButton) {

        plotlineButton.addEventListener('click', function() {
            changePlotlines(this);
        });

        plotlineButton.addEventListener('mouseover', function() {
            this.click();
            clearTimeout(timerPlotline);
        });

    });

    var startPlotlines = function() {

        clearTimeout(timerPlotline);
        var activePlotlineButton = document.querySelector('[data-active-button]').dataset.plotlineShow;
        var nextPlotlineButton;
        if (activePlotlineButton == 5) {
            nextPlotlineButton = document.querySelector('[data-plotline-show="1"]');
        } else {
            nextPlotlineButton = document.querySelector('[data-plotline-show="' + (parseInt(activePlotlineButton, 10) + 1) + '"]');
        }
        timerPlotline = setTimeout(function() {
            nextPlotlineButton.click();
            startPlotlines();
        }, 4000);
    };

    var triggerPlotline = function() {
        if ((window.pageYOffset > document.getElementById('plotline').offsetTop) && !plotlineStarted) {
            startPlotlines();
            plotlineStarted = true;
        } else if (window.pageYOffset > (document.getElementById('plotline').offsetTop + 600)) {
            clearTimeout(timerPlotline);
            plotlineStarted = false;
        } else if (window.pageYOffset < document.getElementById('plotline').offsetTop) {
            clearTimeout(timerPlotline);
            plotlineStarted = false;
        }
    };

    window.addEventListener('scroll', function() {
        triggerPlotline();
    });



    // map
    window.addEventListener("load", function() {

        if (viewportWidth > 960) {
            var svgObject = document.querySelector('[data-svg-object]');

            if (svgObject.contentDocument) {
                svgObject.parentElement.replaceChild(svgObject.contentDocument.documentElement.cloneNode(true), svgObject);
            }

            if (activeCityPath.length === 0) {
                document.querySelector('[data-city-path="berlin"]').setAttribute('data-active', true);
                document.querySelector('[data-city-point="berlin"]').setAttribute('data-active', true);
                document.querySelector('[data-city-plane="berlin"]').setAttribute('data-active', true);
            }
        }

    });

    // mobile nav
    var viewportWidth = window.innerWidth;

    if (viewportWidth < 960) {
        var menuTrigger = document.querySelector(['[data-trigger="menu"]']);
        var menuLinks = document.querySelectorAll('[data-smooth-scroll]');

        menuTrigger.removeAttribute('hidden');
        document.body.classList.add('size-small');

        menuTrigger.addEventListener('click', function() {
            document.body.classList.toggle('menu-open');
        });

        [].forEach.call(menuLinks, function(menuLink) {
            menuLink.addEventListener('click', function() {
                document.body.classList.remove('menu-open');
            });
        });
    }


    // back to top button
    var backToTopButton = document.querySelector('.back-to-top');

    var lastScrollTop = 0;
    window.addEventListener("scroll", function() {
        var st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop) {
            backToTopButton.classList.remove('is-active');
        } else {
            backToTopButton.classList.add('is-active');
        }
        lastScrollTop = st;
    }, false);


    console.log('JavaScript file with version v' + VERSION + ' loaded with no errors.');

    window.onerror = function() {
        document.documentElement.className = '';
    };

})();