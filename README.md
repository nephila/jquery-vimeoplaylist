VimeoPlaylist
=============
Create your playlist with Vimeo.

Parameters
----------
- startFrom: the video index to start from. (default 0)
- startTime: start from the specified point (in seconds) in the first video. (default 0)
- volume: player initial volume.
- videoList: list of videos {'vimeoid' : 'id_video'}

Events
------
- onVideoStart(videoIndex): called when the current video ends, you can use the current video index
- onVideoFinish(videoIndex): called when the current video ends, you can use the current video index

Usage
-----
Now you can use VimeoPlaylist plugin

    $('#player2').vimeoplaylist({
        startFrom : 1,
        startTime : 12,
        volume : 0.0,
        videoList : [{'vimeoid' : '7100569'}, {'vimeoid' : '240975'}],
        onVideoStart: function(videoIndex) {
            console.log(videoIndex);
        },
        onVideoFinish: function(videoIndex) {
            console.log(videoIndex);
        },
    });

Dependencies
------------
- Froogaloop 2.0