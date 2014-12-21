jquery.vimeoplaylist
====================
Create your playlist with Vimeo.

Parameters
----------
- startFrom: the video index to start from. (default 0)
- startTime: start from the specified point (in seconds) in the first video. (default 0)
- volume: player initial volume.
- videoList: your video ids.

Parameter videoList can be definend using a list of vimeo ids:

    videoList:['vimeo_id1', 'vimeo_id2'],

or a list of dictionaries containing 'vimeoid':

    videoList:[
        {'vimeoid' : 'id_video1', 'name', 'My first video'},
        {'vimeoid' : 'id_video2', 'name', 'My second video'}
    ],

Events
------
- onVideoStart(videoIndex): called when the current video starts
- onVideoFinish(videoIndex): called when the current video ends

Usage
-----

    $('#player2').vimeoplaylist({
        startFrom : 1,
        startTime : 12,
        volume : 0.0,
        videoList : ['7100569', '240975'],
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