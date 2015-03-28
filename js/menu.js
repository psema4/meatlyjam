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

        this.text1 = game.add.text(0,0, 'click or press space to start...');
        this.text1.font = 'Patrick Hand';
        this.center(this.text1, 415);

        this.text1.inputEnabled = true;
        this.text1.input.useHandCursor = true;

        this.text1.events.onInputDown.add(function() {
            this.startGame();
        }, this);

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
