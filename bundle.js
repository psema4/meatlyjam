(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var o;"undefined"!=typeof window?o=window:"undefined"!=typeof global?o=global:"undefined"!=typeof self&&(o=self),o.SoundCloudAudio=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/dmitri/github/soundcloud-html5-audio":[function(require,module,exports){
'use strict';

function SoundCloud (clientId) {
    if (!(this instanceof SoundCloud)) {
        return new SoundCloud(clientId);
    }

    if (!clientId) {
        throw new Error('SoundCloud API clientId is required, get it - https://developers.soundcloud.com/');
    }

    this._clientId = clientId;
    this._baseUrl = 'http://api.soundcloud.com';

    this.playing = false;
    this.duration = 0;

    this.audio = document.createElement('audio');
}

SoundCloud.prototype.resolve = function (url, callback) {
    if (!url) {
        throw new Error('SoundCloud track or playlist url is required');
    }

    url = this._baseUrl+'/resolve.json?url='+url+'&client_id='+this._clientId;

    this._jsonp(url, function (data) {
        if (data.tracks) {
            this._playlist = data;
        } else {
            this._track = data;
        }

        this.duration = data.duration/1000; // convert to seconds
        callback(data);
    }.bind(this));
};

SoundCloud.prototype._jsonp = function (url, callback) {
    var target = document.getElementsByTagName('script')[0] || document.head;
    var script = document.createElement('script');

    var id = 'jsonp_callback_'+Math.round(100000*Math.random());
    window[id] = function (data) {
        if (script.parentNode) {
            script.parentNode.removeChild(script);
        }
        window[id] = function () {};
        callback(data);
    };

    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + id;
    target.parentNode.insertBefore(script, target);
};

SoundCloud.prototype.on = function (e, callback) {
    this.audio.addEventListener(e, callback, false);
};

SoundCloud.prototype.off = function (e, callback) {
    this.audio.removeEventListener(e, callback);
};

SoundCloud.prototype.play = function (options) {
    options = options || {};
    var src;

    if (options.streamUrl) {
        src = options.streamUrl;
    } else if (this._playlist) {
        var length = this._playlist.tracks.length;
        if (length) {
            this._playlistIndex = options.playlistIndex || 0;

            // be silent if index is out of range
            if (this._playlistIndex >= length || this._playlistIndex < 0) {
                this._playlistIndex = 0;
                return;
            }
            src = this._playlist.tracks[this._playlistIndex].stream_url;
        }
    } else if (this._track) {
        src = this._track.stream_url;
    }

    if (!src) {
        throw new Error('There is no tracks to play, use `streamUrl` option or `load` method');
    }

    src += '?client_id='+this._clientId;

    if (src !== this.audio.src) {
        this.audio.src = src;
    }

    this.playing = src;
    this.audio.play();
};

SoundCloud.prototype.pause = function () {
    this.audio.pause();
    this.playing = false;
};

SoundCloud.prototype.next = function () {
    if (this._playlist && this._playlist.tracks.length) {
        this.play({playlistIndex: ++this._playlistIndex});
    }
};

SoundCloud.prototype.previous = function () {
    if (this._playlist && this._playlist.tracks.length) {
        this.play({playlistIndex: --this._playlistIndex});
    }
};

SoundCloud.prototype.seek = function (e) {
    if (!this.audio.readyState) {
        return false;
    }
    var percent = e.offsetX / e.target.offsetWidth || (e.layerX - e.target.offsetLeft) / e.target.offsetWidth;
    this.audio.currentTime = percent * (this.audio.duration || 0);
};

module.exports = SoundCloud;

},{}]},{},["/Users/dmitri/github/soundcloud-html5-audio"])("/Users/dmitri/github/soundcloud-html5-audio")
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
window.game.state.add('credits', {
    preload: function() {
    }

  , create: function() {
        game.stage.backgroundColor = '#ffffff';
        this.background = game.add.sprite(-10, 0, 'themeatly', 56);
        this.background.scale.setMagnitude(1.2);

        this.lines = [
            {
                text: 'credits'
              , type: 'title'
              , gameObject: {}
            }, {
                text: ''
              , type: ''
              , gameObject: {}
            }, {
                text: 'programming:'
              , type: 'subtitle'
              , gameObject: {}
            }, {
                text: '@psema4'
              , type: 'name'
              , gameObject: {}
            }, {
                text: ''
              , type: ''
              , gameObject: {}
            }, {
                text: 'graphics:'
              , type: 'subtitle'
              , gameObject: {}
            }, {
                text: '@themeatly'
              , type: 'name'
              , gameObject: {}
            }, {
                text: ''
              , type: ''
              , gameObject: {}
            }, {
                text: 'music:'
              , type: 'subtitle'
              , gameObject: {}
            }, {
                text: 'various'
              , type: 'name'
              , gameObject: {}
            }
        ];

        var self = this;
        [].forEach.call(this.lines, function(line, idx) {
            line.gameObject = game.add.text(0,0, line.text);
            line.gameObject.font = 'Patrick Hand';

            if (line.type === 'title') {
                line.gameObject.fontSize = 64;
                line.gameObject.fill = '#ee0000';

            } else if (line.type === 'subtitle') {
                line.gameObject.fontSize = 32;
                line.gameObject.fill = '#ee0000';

            } else {
                line.gameObject.fontSize = 24;
                line.gameObject.fill = '#000000';
            }

            var y = 480 + (idx*32);

            if (y < 80 || y > 300) {
                line.gameObject.alpha = 0;
            } else {
                line.gameObject.alpha = 1;
            }

            self.center(line.gameObject, y);
        });
    }

  , update: function() {
        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            game.state.start('menu');
        }

        var self = this;
        [].forEach.call(this.lines, function(line, idx) {
            line.gameObject.position.y -= 1;
            if (line.gameObject.position.y > 80 && line.gameObject.position.y < 300) {
                line.gameObject.alpha = 1;

            } else {
                line.gameObject.alpha = 0;
            }
        });

        if (this.lines[this.lines.length-1].gameObject.position.y < 100) {
            setTimeout(function() {
                game.state.start('menu');
            }, 1000);
        }
    }

  , center: function(sprite, y) {
        sprite.position.x = (game.width/2) - (sprite.width/2);

        if (y) {
            if (typeof y === 'boolean') {
                sprite.position.y = (game.height/2) - (sprite.height/2);

            } else {
                sprite.position.y = y;
            }
        }
    }

  , render: function() {
        if (gameConfig.debug) game.debug.inputInfo(32, 32);
    }
});

},{}],3:[function(require,module,exports){
window.gameConfig = (localStorage && localStorage.meatlyGameConfig) ? JSON.parse(localStorage.meatlyGameConfig) : {
    debug: false

  , soundcloud: {
        enabled: true
      , appId: '134d492001620300e082175d8de51a04' //FIXME: expose to localStorage? also, add readme note for forks (use new appId)
      , playlistUrl: 'https://soundcloud.com/psema4/sets/music-mondays-vol-2'
      , volume: 0.5
    }
};

window.saveGameConfig = function() {
    localStorage.meatlyGameConfig = JSON.stringify(gameConfig);
}

if (localStorage && (! localStorage.meatlyGameConfig)) {
    console.log('saving configuration data');
    saveGameConfig();
}

window.game = new Phaser.Game(400, 450, Phaser.AUTO, 'screen');

// the active method will fire (starting the game) once the fonts (preloaded in state 'startup') are ready.
window.WebFontConfig = {
    active: function() {
        game.time.events.add(Phaser.Timer.SECOND, function() {
            console.log('launching menu');
            game.state.start('menu');
        }, this);
    },
    google: {
      families: ['Patrick Hand']
    }

};

window.scConfigured = false;
window.setupSoundcloud = function(cb) {
    if (gameConfig.soundcloud.enabled) {
        if (! window.scConfigured) {
            window.scConfigured = true;
            console.log('connecting playlist');
        
            var SoundCloudAudio = require("./..\\bower_components\\soundcloud-audio\\dist\\soundcloud-audio.js");
        
            window.scPlayer = new SoundCloudAudio(gameConfig.soundcloud.appId);
        
            scPlayer.resolve(gameConfig.soundcloud.playlistUrl, function (err, playlist) {
                scPlayer.audio.volume = gameConfig.soundcloud.volume;

                if (cb && typeof cb === 'function') cb();

                scPlayer.on('ended', function () {
                    scPlayer.next();
                });
        
                //scPlayer.play({playlistIndex: 0});
            });
        
            scPlayer.volume = function(vol) {
                var dirty = false;
        
                switch (typeof vol) {
                    case 'number':
                        scPlayer.audio.volume = vol;
                        dirty = true;
                        break;
        
                    case 'boolean':
                        scPlayer.audio.volume = vol ? 1 : 0;
                        dirty = true;
                        break;
        
                    case 'undefined':
                    default:
                        console.log('vol [%s]:', typeof vol, vol);
                        break;
                }
        
                if (dirty) {
                    gameConfig.soundcloud.volume = vol;
                    saveGameConfig();
                }
        
                return scPlayer.audio.volume;
            }

        } else {
            // already configured
            if (cb && typeof cb === 'function') cb();
        }

    } else {
        console.log('soundcloud disabled in configuration, skipping playlist setup');
    }
}

window.addEventListener('load', function() {
    setupSoundcloud();
    console.log('preloading assets');
    game.state.start('startup');
});

},{"./..\\bower_components\\soundcloud-audio\\dist\\soundcloud-audio.js":1}],4:[function(require,module,exports){
window.game.state.add('level1', {
    preload: function() {
    }

  , create: function() {
        game.stage.backgroundColor = '#ffffff';
        this.background = game.add.sprite(-10, 0, 'themeatly', 56);
        this.background.scale.setMagnitude(1.2);

        this.sprite1 = game.add.sprite(0,0, 'themeatly', 62);
        this.sprite1.scale.setMagnitude(0.5);
        this.center(this.sprite1, true);

        this.text1 = game.add.text(0,0, 'level 1');
        this.text1.font = 'Patrick Hand';
        this.center(this.text1, 415);

        var self = this;
        setTimeout(function() { self.fadeOut.call(self); }, 3000);
    }

  , update: function() {
    }

  , center: function(sprite, y) {
        sprite.position.x = (game.width/2) - (sprite.width/2);

        if (y) {
            if (typeof y === 'boolean') {
                sprite.position.y = (game.height/2) - (sprite.height/2);

            } else {
                sprite.position.y = y;
            }
        }
    }

  , fadeOut: function() {
        this.text1.alpha -= 0.1;

        if (this.text1.alpha > 0) {
            var self = this;
            setTimeout(function() { self.fadeOut.call(self); }, 150);

        } else {
            //FIXME: destroy text1
            //FIXME: destroy sprite1
            this.sprite1.alpha = 0;

            //FIXME: proper workflow
            setTimeout(function() {
                game.state.start('credits');
            }, 5000);
        }
    }
  
  , render: function() {
        if (gameConfig.debug) game.debug.inputInfo(32, 32);
    }
});

},{}],5:[function(require,module,exports){
window.game.state.add('level2', {
    preload: function() {
    }

  , create: function() {
    }

  , update: function() {
    }
  
  , render: function() {
        if (gameConfig.debug) game.debug.inputInfo(32, 32);
    }
});

},{}],6:[function(require,module,exports){
window.game.state.add('level3', {
    preload: function() {
    }

  , create: function() {
    }

  , update: function() {
    }

  , render: function() {
        if (gameConfig.debug) game.debug.inputInfo(32, 32);
    }
});

},{}],7:[function(require,module,exports){
window.game.state.add('menu', {
    preload: function() {
    }

  , create: function() {
        game.stage.backgroundColor = '#ffffff';
        this.background = game.add.sprite(-10, 0, 'themeatly', 56);
        this.background.scale.setMagnitude(1.2);

        this.sprite1 = game.add.sprite(0,0, 'themeatly', 62);
        this.sprite1.scale.setMagnitude(0.5);
        this.center(this.sprite1, 70);

        this.sprite2 = game.add.sprite(0,0, 'themeatly', 63);
        this.sprite2.scale.setMagnitude(0.5);
        this.center(this.sprite2, 180);

        this.sprite3 = game.add.sprite(0,0, 'themeatly', 63);
        this.sprite3.scale.setMagnitude(0.5);
        this.center(this.sprite3, 210);

/*      this.text1 = game.add.text(0,0, 'click or press space to start...');
        this.text1.font = 'Patrick Hand';
        this.center(this.text1, 415);

        this.text1.inputEnabled = true;
        this.text1.input.useHandCursor = true;

        this.text1.events.onInputDown.add(function() {
            this.startGame();
        }, this);
*/
        this.text2 = game.add.text(0,0, 'play');
        this.text2.font = 'Patrick Hand';
        this.center(this.text2, 256); //FIXME: attach text to button sprite, crop button sprite and attach click handler to button (not text)
        this.text2.inputEnabled = true;
        this.text2.input.useHandCursor = true;
        this.text2.events.onInputDown.add(function() {
            this.startGame();
        }, this);

        this.text3 = game.add.text(0,0, 'options');
        this.text3.font = 'Patrick Hand';
        this.center(this.text3, 287); //FIXME: attach text to button sprite, crop button sprite and attach click handler to button (not text)
        this.text3.inputEnabled = true;
        this.text3.input.useHandCursor = true;
        this.text3.events.onInputDown.add(function() {
            game.state.start('options');
        }, this);


        if (gameConfig.soundcloud.enabled) {
            setupSoundcloud(function() { scPlayer.play(); });
        }
    }

  , update: function() {
        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.startGame();
        }
    }

  , startGame: function() {
        game.state.start('level1');
    }

  , center: function(sprite, y) {
        sprite.position.x = (game.width/2) - (sprite.width/2);

        if (y) {
            if (typeof y === 'boolean') {
                sprite.position.y = (game.height/2) - (sprite.height/2);

            } else {
                sprite.position.y = y;
            }
        }
    }

  , render: function() {
        if (gameConfig.debug) game.debug.inputInfo(32, 32);
    }
});

},{}],8:[function(require,module,exports){
window.game.state.add('options', {
    preload: function() {
    }

  , create: function() {
        game.stage.backgroundColor = '#ffffff';
        this.background = game.add.sprite(-10, 0, 'themeatly', 56);
        this.background.scale.setMagnitude(1.2);

        this.text1 = game.add.text(0,0, 'options');
        this.text1.font = 'Patrick Hand';
        this.center(this.text1, 415);


        this.text1.inputEnabled = true;
        this.text1.input.useHandCursor = true;

        this.text1.events.onInputDown.add(function() {
            game.state.start('menu');
        }, this);

        // setup option labels
        this.lblDebug = game.add.text(100,100, 'debug:');
        this.lblDebug.font = 'Patrick Hand';

        this.lblScEnabled = game.add.text(100,132, 'soundcloud:');
        this.lblScEnabled.font = 'Patrick Hand';

        this.lblScVolume = game.add.text(100,164, 'volume:');
        this.lblScVolume.font = 'Patrick Hand';

        // setup option values
        var debugValue = gameConfig.debug ? 'on' : 'off';
        var scValue = gameConfig.soundcloud.enabled ? 'on' : 'off';
        var volValue = gameConfig.soundcloud.volume.toFixed(1) + '';

        this.valDebug = game.add.text(240,100, debugValue);
        this.valDebug.font = 'Patrick Hand';
        this.valDebug.inputEnabled = true;
        this.valDebug.input.useHandCursor = true;

        this.valSc = game.add.text(240,132, scValue);
        this.valSc.font = 'Patrick Hand';
        this.valSc.inputEnabled = true;
        this.valSc.input.useHandCursor = true;

        this.valVol = game.add.text(240,164, volValue);
        this.valVol.font = 'Patrick Hand';
        this.valVol.inputEnabled = true;
        this.valVol.input.useHandCursor = true;

        // option value event handlers
        this.valDebug.events.onInputDown.add(function() {
            gameConfig.debug = !gameConfig.debug;
            saveGameConfig();
            this.valDebug.text = gameConfig.debug ? 'on' : 'off';
        }, this);

        this.valSc.events.onInputDown.add(function() {
            gameConfig.soundcloud.enabled = !gameConfig.soundcloud.enabled;
            saveGameConfig();
            this.valSc.text = gameConfig.soundcloud.enabled ? 'on' : 'off';

            if (gameConfig.soundcloud.enabled) {
                setupSoundcloud(function() {
                    scPlayer.play();
                });

            } else {
                if (scPlayer) {
                    scPlayer.pause();
                }
            }
        }, this);

        this.valVol.events.onInputDown.add(function() {
            var vol = gameConfig.soundcloud.volume;
            vol -= 0.1;
            if (vol < 0) vol = 1;

            scPlayer.volume(vol);
            this.valVol.text = gameConfig.soundcloud.volume.toFixed(1) + '';
        }, this);
    }

  , update: function() {
        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            game.state.start('menu');
        }
    }

  , center: function(sprite, y) {
        sprite.position.x = (game.width/2) - (sprite.width/2);

        if (y) {
            if (typeof y === 'boolean') {
                sprite.position.y = (game.height/2) - (sprite.height/2);

            } else {
                sprite.position.y = y;
            }
        }
    }

  , render: function() {
        if (gameConfig.debug) game.debug.inputInfo(32, 32);
    }
});

},{}],9:[function(require,module,exports){
window.game.state.add('startup', {
    preload: function() {
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        game.load.spritesheet('themeatly', 'assets/meatlyjam01spritesheet.png', 512, 512);
    }

  , create: function() {
    }

  , update: function() {
    }
});

},{}]},{},[3,9,7,8,2,4,5,6]);
