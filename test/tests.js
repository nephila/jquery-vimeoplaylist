module('vimeoplugin');

var generateTestPlayer = function(id) {
    $('#qunit-fixture').append('<iframe id="' + id + '" width="630" height="354" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
}

test( "test video switch", function( assert ) {
    var skipVideoStart = true;
    generateTestPlayer('player5');
    var doneVideo0 = assert.async();
    var doneVideo1 = assert.async();
    var player = $('#player5').vimeoplaylist({
        startFrom : 1,
        startTime : 90,
        videoList : [{'vimeoid' : '7100569'}, {'vimeoid' : '240975'}],
        onVideoStart: function(videoIndex) {
            if (!skipVideoStart) {
                assert.equal(videoIndex, 0, 'Start first video');
                doneVideo1();
            } else {
                skipVideoStart = false;
            }
        },
        onVideoFinish: function(videoIndex) {
            assert.equal(videoIndex, 1, 'Finish second video');
            doneVideo0();
        },
    });
});

test( "test onVideoFinish call", function( assert ) {
    generateTestPlayer('player1');
    var done = assert.async();
    var player = $('#player1').vimeoplaylist({
        startFrom : 1,
        startTime : 90,
        videoList : [{'vimeoid' : '7100569'}, {'vimeoid' : '240975'}],
        onVideoFinish: function(videoIndex) {
            assert.equal(videoIndex, 1, 'Finish second video');
            done();
        },
    });
});

test( "init test", function( assert ) {
    generateTestPlayer('player2');
    var player = $('#player2').vimeoplaylist({
        startFrom : 1,
        startTime : 12,
        videoList : [{'vimeoid' : '7100569'}, {'vimeoid' : '240975'}]});
    assert.notEqual(player, undefined, 'Plugin should return an object');
});

test( "volume test default", function( assert ) {
    generateTestPlayer('player3');
    var done = assert.async();
    var player = $('#player3').vimeoplaylist({
        startFrom : 1,
        startTime : 12,
        videoList : [{'vimeoid' : '7100569'}, {'vimeoid' : '240975'}],
        onVideoStart: function(videoIndex) {
            assert.equal(this.settings.volume, -1, 'Default volume should remain -1 after start');
            done();
        },
    });
});

test( "test onVideoStart call", function( assert ) {
    generateTestPlayer('player4');
    var done = assert.async();
    var player = $('#player4').vimeoplaylist({
        startFrom : 1,
        startTime : 12,
        videoList : [{'vimeoid' : '7100569'}, {'vimeoid' : '240975'}],
        onVideoStart: function(videoIndex) {
            assert.equal(videoIndex, 1, 'Start second video');
            done();
        },
    });
});

test( "test use structured playlist", function( assert ) {
    generateTestPlayer('player6');
    var player = $('#player6').vimeoplaylist({
        startFrom : 0,
        startTime : 12,
        videoList : [{'vimeoid' : '7100569'}],
    });

    var expectedSrc = '//player.vimeo.com/video/' + '7100569' + '?api=1&player_id=' + 'player6';
    assert.equal($('#player6').attr('src'), expectedSrc, 'Default volume should remain -1 after start');
});

test( "test use list playlist", function( assert ) {
    generateTestPlayer('player6');
    var player = $('#player6').vimeoplaylist({
        startFrom : 0,
        startTime : 12,
        videoList : ['7100569'],
    });

    var expectedSrc = '//player.vimeo.com/video/' + '7100569' + '?api=1&player_id=' + 'player6';
    assert.equal($('#player6').attr('src'), expectedSrc, 'Default volume should remain -1 after start');
});
