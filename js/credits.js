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
