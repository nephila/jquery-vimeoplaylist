# jquery.vimeoplaylist

[![Build Status](https://travis-ci.org/nephila/jquery-vimeoplaylist.png?branch=master)](https://travis-ci.org/nephila/jquery-vimeoplaylist)
![Bower version](https://img.shields.io/bower/v/jquery.vimeoplaylist.svg)
[![npm version](https://img.shields.io/npm/v/jquery.vimeoplaylist.svg)](https://www.npmjs.com/package/jquery.vimeoplaylist)

Create your playlists with Vimeo.

## Install
You can install with [bower](http://bower.io/) or [npm](https://www.npmjs.com/).

    $ bower install jquery.vimeoplaylist
    $ npm install jquery.vimeoplaylist

## Try it!
Run

    grunt serve

Then open http://localhost:8123/index.html

## Parameters
- startFrom: the video index to start from. (default 0)
- startTime: start from the specified point (in seconds) in the first video. (default 0)
- volume: player initial volume.
- videoList: your video ids.

Parameter videoList can be definend using a list of vimeo ids:

    videoList:['vimeo_id1', 'vimeo_id2'],

or a list of dictionaries containing 'vimeoid':

    videoList:[
        {'vimeoid' : 'id_video1', 'title': 'My first video'},
        {'vimeoid' : 'id_video2', 'title': 'My second video'}
    ],

## Events
- 'videostart'(videoIndex, videoInfo): triggered when the current video starts
- 'videoend'(videoIndex, videoInfo): triggered when the current video ends

## Usage

    $('#player2').vimeoplaylist({
        startFrom : 1,
        startTime : 12,
        volume : 0.0,
        videoList : ['7100569', '240975'],
    });

    $('#player2').on('videostart', function(e, videoIndex) {
        console.log('Start ' + videoIndex);
    });

    $('#player2').on('videoend', function(e, videoIndex) {
        console.log('End ' + videoIndex);
    });
