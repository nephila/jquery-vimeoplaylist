(function ( $ ) {

    var pluginName = "vimeoplaylist",
        defaults = {
            startFrom: 0,
            startTime: 0,
            videoList: [],
            volume : -1,
            onVideoFinish : function() {},
            onVideoStart: function() {},
        };

    function VimeoPlaylist ( element, options ) {
        this.element = element;
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    $.extend(VimeoPlaylist.prototype, {
        init: function () {
            var that = this;
            this._videos = [];
            this._firstPlay = true;
            var videoid = "";
            for(var i = 0 ; i < this.settings.videoList.length ; i++) {
                if(this.settings.videoList[i].hasOwnProperty("vimeoid")) {
                    videoid = this.settings.videoList[i].vimeoid;
                } else {
                    videoid = this.settings.videoList[i];
                }
                this._videos.push("//player.vimeo.com/video/" + videoid + "?api=1&player_id=" + that.element.id);
            }
            this._currentVideo = this.settings.startFrom;
            if (this._currentVideo >= this._videos.length) {
                this._currentVideo = this._videos.length - 1;
            }
            this._iframe = $(this.element);
            this._iframe.attr("src", this._videos[this._currentVideo % this._videos.length]);
            this._player = $f($(this.element)[0]);

            this._player.addEvent("ready", function() {
                that._player.addEvent("pause", onPause);
                that._player.addEvent("playProgress", onPlayProgress);
                that._player.addEvent("finish", onFinish);
                if (that.settings.volume !== -1) {
                    that._player.api("setVolume", that.settings.volume);
                }
                if (isOnMobile()) {
                    //TODO stuff in the future
                } else {
                    that._player.api("play");
                    if (that._firstPlay) {
                        that._player.api("seekTo", that.settings.startTime);
                    }
                    var videoIndex = that._currentVideo % that._videos.length;
                    $(that.element).trigger(
                        "videostart",
                        [videoIndex, that.settings.videoList[videoIndex]]
                    );
                    that.settings.onVideoStart.call(
                        that.element, videoIndex,
                        that.settings.videoList[videoIndex]
                    );
                }
            });

            function isOnMobile() {
                return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            }

            function onPause() {
            }

            function onFinish() {
                var videoIndex = that._currentVideo % that._videos.length;
                $(that.element).trigger(
                    "videoend",
                    [videoIndex, that.settings.videoList[videoIndex]]
                );
                that.settings.onVideoFinish.call(
                    that.element, videoIndex,
                    that.settings.videoList[videoIndex]
                );
                that._currentVideo++;
                that._iframe.attr("src", that._videos[that._currentVideo % that._videos.length]);
                that._firstPlay = false;
            }

            function onPlayProgress() {
                if (isOnMobile()) {
                    if (that._firstPlay) {
                        var videoIndex = that._currentVideo % that._videos.length;
                        $(that.element).trigger(
                            "videostart",
                            [videoIndex, that.settings.videoList[videoIndex]]
                        );
                        that.settings.onVideoStart.call(
                            that.element, videoIndex,
                            that.settings.videoList[videoIndex]
                        );
                        that._player.api("seekTo", that.settings.startTime);
                        that._firstPlay = false;
                    }
                }
            }

        },

        startVideo: function (index) {
            var videoIndex = this._currentVideo % this._videos.length;
            $(this.element).trigger(
                "videoend",
                [videoIndex, this.settings.videoList[videoIndex]]
            );
            this.settings.onVideoFinish.call(
                this.element, videoIndex,
                this.settings.videoList[videoIndex]
            );
            this._currentVideo = index;
            this._iframe.attr("src", this._videos[index % this._videos.length]);
            this._firstPlay = false;
        },

        getPlayer: function () {
            return this._player;
        },

        getVolume: function () {
            return this.settings.volume;
        }
    });

    $.fn[ pluginName ] = function ( options ) {
        this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new VimeoPlaylist(this, options));
            }
        });
        return this;
    };
}( jQuery ));
