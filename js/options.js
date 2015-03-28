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
