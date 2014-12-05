VimeoPlaylist
=============
Create your playlist with Vimeo.

Parameters
----------
- startFrom: the video index to start from. (default 0)
- startTime: start from the specified point (in seconds) in the first video. (default 0)
- player: player element. (default $('#player1'))

Events
------
- onVideoStart(videoIndex): called when the current video ends, you can use the current video index
- onVideoFinish(videoIndex): called when the current video ends, you can use the current video index

Usage
-----
Define a simple playlist containing vimeo video ids

    <ul id='myplaylist'>
        <li>7100569</li>
        <li>240975</li>
    </ul>

Now you can use VimeoPlaylist plugin

    $('#myplaylist').vimeoplaylist({
        startFrom : 1,
        startTime : 12,
        player: $('#player2'),
        onVideoStart: function(videoIndex) {
            console.log(videoIndex);
        },
        onVideoFinish: function(videoIndex) {
            console.log(videoIndex);
        },
    });

Dependencies
------------
- Jquery
- Froogaloop 2.0