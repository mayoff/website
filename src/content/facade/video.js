
(function () {

    function initVideos() {
        var videos = document.getElementsByTagName('video');
        Array.prototype.forEach.call(videos, function (video) {
            var wrapper = video.parentNode;
            var dimmer = wrapper.querySelector('.videoDimmer');

            function videoDidChangeState() {
                if (video.paused) {
                    wrapper.classList.add('paused');
                    wrapper.classList.remove('playing');
                } else {
                    wrapper.classList.add('playing');
                    wrapper.classList.remove('paused');
                }
            }

            function videoWasClicked() {
                if (video.paused) {
                    if (video.duration - video.currentTime < 0.01) {
                        video.currentTime = 0;
                    }
                    video.play();
                } else {
                    video.pause();
                }
            }


            video.addEventListener('play', videoDidChangeState, false);
            video.addEventListener('pause', videoDidChangeState, false);
            wrapper.addEventListener('click', videoWasClicked, false);

            videoDidChangeState();
        });
    }

    window.addEventListener('load', function () {
        initVideos();
    }, false);

})();

