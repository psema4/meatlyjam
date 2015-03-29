window.gameConfig = (localStorage && localStorage.meatlyGameConfig) ? JSON.parse(localStorage.meatlyGameConfig) : {
    debug: false

  , hiscore: 0

  , soundcloud: {
        enabled: true
      , appId: '134d492001620300e082175d8de51a04' //FIXME: expose to localStorage? also, add readme note for forks (use new appId)
      , playlistUrl: 'https://soundcloud.com/psema4/sets/music-mondays-vol-2' //FIXME: breakout to collection, create new state to let user select from list
//      , playlistUrl: 'https://soundcloud.com/psema4/sets/the-incredible-glitch'  
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

window.playlistStarted = false;
window.scConfigured = false;
window.setupSoundcloud = function(cb) {
    if (gameConfig.soundcloud.enabled) {
        if (! window.scConfigured) {
            window.scConfigured = true;
            console.log('connecting playlist');
        
            var SoundCloudAudio = require('soundcloud-audio');
        
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

//FIXME: DEBUG
window.$state = function() {
    return game.state.states[game.state.current];
}
