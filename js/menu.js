window.game.state.add('menu', {
    preload: function() {
    }

  , create: function() {
        game.stage.backgroundColor = '#ffffff';

        this.background = game.add.sprite(-10, 0, 'themeatly', 56);
        this.background.scale.setMagnitude(1.2);

        this.sprite1 = game.add.sprite(0,0, 'meatlyface');
        this.sprite1.scale.setMagnitude(0.5);
        this.center(this.sprite1, 70);

        this.elglitch = game.add.sprite(20,320, 'themeatly', 55);
        this.elglitch.scale.setMagnitude(0.35);
        this.elglitch.alpha = 0;
        if ('cordova' in window) this.elglitch.aplha = 1;

        this.ideafairy = game.add.sprite(260,0, 'themeatly', 53);
        this.ideafairy.scale.setMagnitude(0.35);
        this.ideafairy.alpha = 0;

        // Play Button
        this.sprite2 = game.add.sprite(0,0, 'themeatly', 63);
        this.sprite2.scale.setMagnitude(0.5);
        this.center(this.sprite2, 180);

        this.text2 = game.add.text(0,0, 'play');
        this.text2.font = 'Patrick Hand';
        this.center(this.text2, 256); //FIXME: attach text to button sprite, crop button sprite and attach click handler to button (not text)
        this.text2.inputEnabled = true;
        this.text2.input.useHandCursor = true;
        this.text2.events.onInputDown.add(function() {
            this.startGame();
        }, this);

        // Options Button
        this.sprite3 = game.add.sprite(0,0, 'themeatly', 63);
        this.sprite3.scale.setMagnitude(0.5);
        this.center(this.sprite3, 210);

        this.text3 = game.add.text(0,0, 'options');
        this.text3.font = 'Patrick Hand';
        this.center(this.text3, 287); //FIXME: attach text to button sprite, crop button sprite and attach click handler to button (not text)
        this.text3.inputEnabled = true;
        this.text3.input.useHandCursor = true;
        this.text3.events.onInputDown.add(function() {
            game.state.start('options');
        }, this);

        // Start playlist playback if it's configured and not already playing
        if (gameConfig.soundcloud.enabled) {
            if (window.scConfigured && !window.playlistStarted) {
                window.playlistStarted = true;
                setupSoundcloud(function() { scPlayer.play(); });
            }
        }
    }

  , update: function() {
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
