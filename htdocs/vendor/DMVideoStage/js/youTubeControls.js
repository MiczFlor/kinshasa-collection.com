var player,
    time_update_interval = 0;

// read JSON for things to do
var eventsTimeline = [{
        "id": "1",
        "start": "3",
        "stop": "6",
        "toggleTrigger": "toggleHide",
        "toggleStart": "toggleShow",
        "toggleStop": "toggleHide",
        "toggleId": "ID1"
    },
    {
        "id": "2",
        "start": "10",
        "stop": "15",
        "toggleTrigger": "toggleHide",
        "toggleStart": "toggleShow",
        "toggleStop": "toggleHide",
        "toggleId": "ID2"
    }
];

function onYouTubeIframeAPIReady() {
    player = new YT.Player('video-placeholder', {
        videoId: 'Xa0Q0J5tOP0',
        playerVars: {
            'color': 'white',
            'autoplay': 1,
            'start': 0,
            'controls': 0,
            'rel': 0,
            'showinfo': 0
        },
        events: {
            onReady: initialize
        }
    });
}

function initialize() {

    // Update the controls on load
    updateTimerDisplay();
    updateProgressBar();
    checkForEvents();
    player.unMute();

    // Clear any old interval.
    clearInterval(time_update_interval);

    // Start interval to update elapsed time display and
    // the elapsed part of the progress bar every second.
    time_update_interval = setInterval(function() {
        updateTimerDisplay();
        updateProgressBar();
        checkForEvents();
    }, 1000);

    $('#volume-input').val(Math.round(player.getVolume()));
}

// This function is called by initialize()
function checkForEvents() {
    for (var i = 0; i < eventsTimeline.length; i++) {
        var obj = eventsTimeline[i];
        // if stop is not defined, set it to five seconds after start
        if (typeof obj.stop === "undefined") {
            obj.stop = parseInt(obj.start) + 5;
        }
        if (player.getCurrentTime() > obj.start && player.getCurrentTime() < obj.stop) {
            if ($('#' + obj.toggleId).hasClass(obj.toggleTrigger)) {
                console.log(obj.toggleId);
                $('#' + obj.toggleId).toggleClass(obj.toggleStart + ' ' + obj.toggleStop);
            }
        }
        if (player.getCurrentTime() > obj.stop) {
            if ($('#' + obj.toggleId).hasClass(obj.toggleStart)) {
                console.log(obj.toggleId);
                $('#' + obj.toggleId).toggleClass(obj.toggleStart + ' ' + obj.toggleStop);
            }
        }
    }
}

// This function is called by initialize()
function updateTimerDisplay() {
    // Update current time text display.
    $('#current-time').text(formatTime(player.getCurrentTime()));
    $('#duration').text(formatTime(player.getDuration()));
}


// This function is called by initialize()
function updateProgressBar() {
    // Update the value of our progress bar accordingly.
    $('#progress-bar').val((player.getCurrentTime() / player.getDuration()) * 100);
}


// Progress bar

$('#progress-bar').on('mouseup touchend', function(e) {

    // Calculate the new time for the video.
    // new time in seconds = total duration in seconds * ( value of range input / 100 )
    var newTime = player.getDuration() * (e.target.value / 100);

    // Skip video to new time.
    player.seekTo(newTime);

});


// Playback

$('#play').on('click', function() {
    player.playVideo();
});


$('#pause').on('click', function() {
    player.pauseVideo();
});


$('#play-toggle').on('click', function() {
    var play_toggle = $(this);

    if (player.getPlayerState() == 1) {
        player.pauseVideo();
        play_toggle.text('play_arrow');
    } else {
        player.playVideo();
        play_toggle.text('pause');
    }
});

// Fullscreen toggle

$('#fullscreen-toggle').on('click', function() {
    var fullscreen_toggle = $(this);
    // check if browser is in fullscreen mode
    if (window.innerHeight == screen.height) {
        exitFullscreen();
        fullscreen_toggle.text('fullscreen');
    } else {
        launchFullscreen(document.documentElement);
        fullscreen_toggle.text('fullscreen_exit');
    }
});

// Sound volume


$('#mute-toggle').on('click', function() {
    var mute_toggle = $(this);

    if (player.isMuted()) {
        player.unMute();
        mute_toggle.text('volume_up');
    } else {
        player.mute();
        mute_toggle.text('volume_off');
    }
});

$('#volume-input').on('change', function() {
    player.setVolume($(this).val());
});


// Other options


$('#speed').on('change', function() {
    player.setPlaybackRate($(this).val());
});

$('#quality').on('change', function() {
    player.setPlaybackQuality($(this).val());
});


// Playlist

$('#next').on('click', function() {
    player.nextVideo()
});

$('#prev').on('click', function() {
    player.previousVideo()
});


// Load video

$('.thumbnail').on('click', function() {

    var url = $(this).attr('data-video-id');

    player.cueVideoById(url);

});


// Helper Functions

function formatTime(time) {
    time = Math.round(time);

    var minutes = Math.floor(time / 60),
        seconds = time - minutes * 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    return minutes + ":" + seconds;
}