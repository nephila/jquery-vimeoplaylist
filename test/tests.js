module("vimeoplugin");

var generateTestPlayer = function(id) {
    $("#qunit-fixture").append("<iframe class='player' id='" + id + "' frameborder='0' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>");
};

test( "init test", function( assert ) {
    generateTestPlayer("player2");
    var player = $("#player2").vimeoplaylist({
        startFrom : 1,
        startTime : 12,
        videoList : [{"vimeoid" : "7100569"}, {"vimeoid" : "240975"}]});
    assert.notEqual(player, undefined, "Plugin should return an object");
});

test( "init plugin for collection", function( assert ) {
    generateTestPlayer("player1");
    generateTestPlayer("player2");
    var players = $(".player").vimeoplaylist({
        startFrom : 1,
        startTime : 90,
        videoList : [{"vimeoid" : "7100569"}, {"vimeoid" : "240975"}],
    });
    assert.equal(players.length, 2, "Get 2 instances");
});

test( "test video switch", function( assert ) {
    var skipVideoStart = true;
    generateTestPlayer("player5");
    var doneVideo0 = assert.async();
    var doneVideo1 = assert.async();
    var player = $("#player5").vimeoplaylist({
        startFrom : 1,
        startTime : 90,
        videoList : [{"vimeoid" : "7100569"}, {"vimeoid" : "240975"}],
        onVideoStart: function(videoIndex) {
            if (!skipVideoStart) {
                assert.equal(videoIndex, 0, "Start first video");
                doneVideo1();
            } else {
                skipVideoStart = false;
            }
        },
        onVideoFinish: function(videoIndex) {
            assert.equal(videoIndex, 1, "Finish second video");
            doneVideo0();
        },
    });
    $(player).data("plugin_vimeoplaylist").getPlayer().callEvent("ready");
    $(player).data("plugin_vimeoplaylist").getPlayer().callEvent("finish");
    $(player).data("plugin_vimeoplaylist").getPlayer().callEvent("ready");
});

test( "test onVideoFinish call", function( assert ) {
    generateTestPlayer("player1");
    var done = assert.async();
    var player = $("#player1").vimeoplaylist({
        startFrom : 1,
        startTime : 90,
        videoList : [{"vimeoid" : "7100569"}, {"vimeoid" : "240975"}],
        onVideoFinish: function(videoIndex) {
            assert.equal(videoIndex, 1, "Finish second video");
            done();
        },
    });
    $(player).data("plugin_vimeoplaylist").getPlayer().callEvent("ready");
    $(player).data("plugin_vimeoplaylist").getPlayer().callEvent("finish");
});

test( "volume test default", function( assert ) {
    generateTestPlayer("player3");
    var done = assert.async();
    var player = $("#player3").vimeoplaylist({
        startFrom : 1,
        startTime : 12,
        videoList : [{"vimeoid" : "7100569"}, {"vimeoid" : "240975"}],
        onVideoStart: function() {
            assert.equal($(this).data("plugin_vimeoplaylist").getVolume(), -1, "Default volume should remain -1 after start");
            done();
        },
    });

    $(player).data("plugin_vimeoplaylist").getPlayer().callEvent("ready");
});

test( "test onVideoStart call", function( assert ) {
    generateTestPlayer("player4");
    var done = assert.async();
    var player = $("#player4").vimeoplaylist({
        startFrom : 1,
        startTime : 12,
        videoList : [{"vimeoid" : "7100569"}, {"vimeoid" : "240975"}],
        onVideoStart: function(videoIndex) {
            assert.equal(videoIndex, 1, "Start second video");
            done();
        },
    });
    $(player).data("plugin_vimeoplaylist").getPlayer().callEvent("ready");
});

test( "test use structured playlist", function( assert ) {
    generateTestPlayer("player6");
    $("#player6").vimeoplaylist({
        startFrom : 0,
        startTime : 12,
        videoList : [{"vimeoid" : "7100569"}],
    });

    var expectedSrc = "//player.vimeo.com/video/" + "7100569" + "?api=1&player_id=" + "player6";
    assert.equal($("#player6").attr("src"), expectedSrc, "Video source should change");
});

test( "test use list playlist", function( assert ) {
    generateTestPlayer("player6");
    $("#player6").vimeoplaylist({
        startFrom : 0,
        startTime : 12,
        videoList : ["7100569"],
    });

    var expectedSrc = "//player.vimeo.com/video/" + "7100569" + "?api=1&player_id=" + "player6";
    assert.equal($("#player6").attr("src"), expectedSrc, "Video source should change");
});

test( "test startVideo call", function( assert ) {
    generateTestPlayer("player10");
    var player = $("#player10").vimeoplaylist({
        startFrom : 0,
        startTime : 12,
        videoList : [{"vimeoid" : "7100569"}, {"vimeoid" : "240975"}],
    });
    $(player).data("plugin_vimeoplaylist").startVideo(1);
    var expectedSrc = "//player.vimeo.com/video/" + "240975" + "?api=1&player_id=" + "player10";
    assert.equal($("#player10").attr("src"), expectedSrc, "Video source should change");
});
