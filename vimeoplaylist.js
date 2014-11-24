(function ( $ ) {

    $.fn.vimeoplaylist = function( options ) {

        var videos = [];
        var firstPlay = true;

        var settings = $.extend({
            startFrom: 0,
            startTime: 0,
            player: $('#player1')
        }, options );

        $(this).hide();

        $(this.selector + ' li').each(function(){
            videos.push('//player.vimeo.com/video/' + $(this).text() + '?api=1&player_id=' +
                settings.player.selector.replace('#', ''));
        });

        var currentVideo = settings.startFrom;

        if (currentVideo >= videos.length)
            currentVideo = videos.length - 1;

        var iframe = settings.player;
        iframe.attr('src', videos[currentVideo % videos.length]);
        var iframe2 = settings.player[0];
        var player = $f(iframe2);

        player.addEvent('ready', function() {
            player.addEvent('pause', onPause);
            player.addEvent('finish', onFinish);
            player.addEvent('playProgress', onPlayProgress);
            if (! /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                player.api('play');
                if (firstPlay)
                    player.api('seekTo', settings.startTime);
            }
        });

        $('button').bind('click', function() {
            player.api($(this).text().toLowerCase());
        });

        function onPause(id) {

        }

        function onFinish(id) {
            currentVideo++;
            iframe.attr('src', videos[currentVideo % videos.length]);
            console.log('finish');
            firstPlay = false;
        }

        function onPlayProgress(data, id) {

        }

        return this;

    };

}( jQuery ));
