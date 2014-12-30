(function ( $ ) {

    $.fn.vimeoplaylist = function( options ) {

        var settings = $.extend({
            startFrom: 0,
            startTime: 0,
            videoList: [],
            volume : -1,
            onVideoFinish : function(videoIndex) {},
            onVideoStart: function(videoIndex) {},
        }, options );

        return this.each(function() {
            var videos = [];
            var firstPlay = true;
            var that = this;

            var videoid = ''
            for(i = 0 ; i < settings.videoList.length ; i++) {
                if(settings.videoList[i].hasOwnProperty('vimeoid')) {
                    videoid = settings.videoList[i]['vimeoid'];
                } else {
                    videoid = settings.videoList[i];
                }
                videos.push('//player.vimeo.com/video/' + videoid + '?api=1&player_id=' + this.id);
            }

            var currentVideo = settings.startFrom;
            if (currentVideo >= videos.length)
                currentVideo = videos.length - 1;

            var iframe = $(this);
            iframe.attr('src', videos[currentVideo % videos.length]);
            var iframe2 = $(this)[0];
            var player = $f(iframe2);

            player.addEvent('ready', function() {
                player.addEvent('pause', onPause);
                player.addEvent('playProgress', onPlayProgress);
                player.addEvent('finish', onFinish);
                if (settings.volume != -1) {
                    player.api('setVolume', settings.volume);
                }
                if (isOnMobile()) {
                    //TODO stuff in the future
                } else {
                    player.api('play');
                    if (firstPlay)
                        player.api('seekTo', settings.startTime);
                    settings.onVideoStart.call(that, currentVideo % videos.length);
                }
            });

            function isOnMobile() {
                return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            }

            function onPause(id) {

            }

            function onFinish(id) {
                settings.onVideoFinish.call(that, currentVideo % videos.length);
                currentVideo++;
                iframe.attr('src', videos[currentVideo % videos.length]);
                firstPlay = false;
            }

            function onPlayProgress(data, id) {
                if (isOnMobile()) {
                    if (firstPlay) {
                        settings.onVideoStart.call(that, currentVideo % videos.length);
                        player.api('seekTo', settings.startTime);
                        firstPlay = false;
                    }
                }
            }

            this.startVideo = function (index) {
                settings.onVideoFinish.call(that, currentVideo % videos.length);
                currentVideo = index;
                iframe.attr('src', videos[index % videos.length]);
                firstPlay = false;
            }

            this.getPlayer = function () {
                return player;
            }

            this.getVolume = function () {
                return settings.volume;
            }
        });

    };

}( jQuery ));
