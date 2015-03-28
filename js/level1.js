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
