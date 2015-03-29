window.game.state.add('options', {
    preload: function() {
    }

  , create: function() {
        game.stage.backgroundColor = '#ffffff';

        this.background = game.add.sprite(-10, 0, 'themeatly', 56);
        this.background.scale.setMagnitude(1.2);

        // ipad's "home button" returns to the main menu
        this.backButton = game.add.sprite(0,0, 'ipadbtn');
        this.backButton.scale.setMagnitude(1.2);
        this.center(this.backButton, 364);
        this.backButton.position.x += 5;
        this.backButton.inputEnabled = true;
        this.backButton.input.useHandCursor = true;
        this.backButton.events.onInputDown.add(function() {
            game.state.start('menu');
        });

        // setup option labels
        this.lblDebug = game.add.text(100,100, 'debug:');
        this.lblDebug.font = 'Patrick Hand';

        this.lblScEnabled = game.add.text(100,132, 'soundcloud:');
        this.lblScEnabled.font = 'Patrick Hand';

        this.lblScVolume = game.add.text(100,164, 'volume:');
        this.lblScVolume.font = 'Patrick Hand';

        this.lblScPlaylist = game.add.text(100,196, 'playlist:');
        this.lblScPlaylist.font = 'Patrick Hand';

        // setup option values
        var debugValue = gameConfig.debug ? 'on' : 'off';
        var scValue = gameConfig.soundcloud.enabled ? 'on' : 'off';
        var volValue = gameConfig.soundcloud.volume.toFixed(1) + '';
        //var plValue = gameConfig.soundcloud.playlistUrl;

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

        this.valPlaylistSelect = game.add.text(240,196, 'select');
        this.valPlaylistSelect.font = 'Patrick Hand';
        this.valPlaylistSelect.inputEnabled = true;
        this.valPlaylistSelect.input.useHandCursor = true;

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

        this.valPlaylistSelect.events.onInputDown.add(function() {
            var result = prompt('Enter a playlist address:', gameConfig.soundcloud.playlistUrl);

            if (result) {
                if (result.match(/^https?:\/\/soundcloud\.com\//)) {
                    gameConfig.soundcloud.playlistUrl = result;
                    console.log('saving playlist: %s', gameConfig.soundcloud.playlistUrl);
                    saveGameConfig();

                    this.valPlaylistSelect.text = 'saved';

                    var self = this;
                    setTimeout(function() {
                        self.valPlaylistSelect.text = 'select';
                    }, 2000);

                } else {
                    console.log('invalid response, playlist change cancelled');
                    this.valPlaylistSelect.text = 'sorry';

                    var self = this;
                    setTimeout(function() {
                        self.valPlaylistSelect.text = 'select';
                    }, 2000);
                }
            }
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
