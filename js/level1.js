window.game.state.add('level1', {
    preload: function() {
    }

  , create: function() {
        game.stage.backgroundColor = '#ffffff';
        game.physics.startSystem(Phaser.Physics.ARCADE);

        window.score = 0;
        this.lives = 3;

        // tablet
        this.background = game.add.sprite(-10, 0, 'themeatly', 56);
        this.background.scale.setMagnitude(1.2);

        // glitch ui
        this.elglitch = game.add.sprite(20,320, 'themeatly', 55);
        this.elglitch.scale.setMagnitude(0.35);
        this.elglitch.alpha = 0;

        // idea fairy ui
        this.ideafairy = game.add.sprite(260,0, 'themeatly', 53);
        this.ideafairy.scale.setMagnitude(0.35);
        this.ideafairy.alpha = 0;

        // tablet "home button" returns to the main menu
        this.backButton = game.add.sprite(0,0, 'ipadbtn');
        this.backButton.scale.setMagnitude(1.2);
        this.center(this.backButton, 364);
        this.backButton.position.x += 5;
        this.backButton.inputEnabled = true;
        this.backButton.input.useHandCursor = true;
        this.backButton.events.onInputDown.add(function() {
            game.state.start('menu');
        });

        // level ui
        var hiscore = gameConfig.hiscore || 0;
        this.text1 = game.add.text(0,0, 'hiscore: ' + hiscore);
        this.text1.font = 'Patrick Hand';
        this.center(this.text1, 110);

        this.text2 = game.add.text(0,0, 'Use the mouse or\nyour finger to move\nthe paddle.\n\nBreak all the blocks!');
        this.text2.font = 'Patrick Hand';
        this.center(this.text2, 150);

        // game elements
        var yOffset = 90;
        var xOffset = 120;
        this.blocks = [];
        this.bgroup = game.add.group();
        this.bgroup.enableBody = true;

        for (var y=0; y<4; y++) {
            var row = [];
            for (var x=0; x<3; x++) {
                var s = game.add.sprite(0,0, 'themeatly', 57, this.bgroup);
                s.anchor.setTo(0.5, 0.5);
                s.scale.setMagnitude(0.2);
                s.position.setTo(xOffset + (x*80), yOffset + (y*40));
                //game.physics.enable(s, Phaser.Physics.ARCADE);
                s.alpha = 0;
                row.push(s);
            }
            this.blocks.push(row);
        }
        this.bgroup.setAll('body.immovable', true);

        // game walls
        this.wallTop = game.add.sprite(0,-30, 'meatlypaddle');
        this.center(this.wallTop, 0);
        game.physics.enable(this.wallTop, Phaser.Physics.ARCADE);
        this.wallTop.body.immovable = true;
        this.wallTop.alpha = 0;

        this.wallLeft = game.add.sprite(0,0, 'meatlyvpaddle');
        this.wallLeft.anchor.setTo(0.5,0.5);
        this.wallLeft.position.setTo(35,225);
        game.physics.enable(this.wallLeft, Phaser.Physics.ARCADE);
        this.wallLeft.body.immovable = true;
        this.wallLeft.alpha = 0;

        this.wallRight = game.add.sprite(0,0, 'meatlyvpaddle');
        this.wallRight.anchor.setTo(0.5,0.5);
        this.wallRight.position.setTo(370,225);
        game.physics.enable(this.wallRight, Phaser.Physics.ARCADE);
        this.wallRight.body.immovable = true;
        this.wallRight.alpha = 0;

        // net
        this.wallNet = game.add.sprite(0,0, 'meatlypaddle');
        this.wallNet.anchor.setTo(0.5,0.5);
        this.wallNet.position.setTo(200,400);
        game.physics.enable(this.wallNet, Phaser.Physics.ARCADE);
        this.wallNet.body.immovable = true;
        this.wallNet.alpha = 0;

        this.paddle = game.add.sprite(0,0, 'meatlypaddle');
        this.paddle.anchor.setTo(0.5, 0.5);
        this.paddle.position.setTo(170,320);
        game.physics.enable(this.paddle, Phaser.Physics.ARCADE);
        this.paddle.body.immovable = true;
        this.paddle.scale.setMagnitude(0.2);
        this.paddle.alpha = 0;

        this.ball = game.add.sprite(0,0, 'themeatly', 62);
        this.ball.anchor.setTo(0.5, 0.5);
        this.ball.position.setTo(200, 300);
        game.physics.enable(this.ball, Phaser.Physics.ARCADE);
        this.ball.scale.setMagnitude(0.1);
        this.ball.alpha = 0;
        this.ball.body.collideWorldBounds = true;
        this.ball.body.bounce.setTo(1, 1);
        this.ball.body.velocity.setTo(0,0);
        window.ballOnPaddle = true;

        // fade out level ui, trigger play start at fade end
        var self = this;
        setTimeout(function() { self.fadeOut.call(self); }, 3000);
    }

  , update: function() {
        var x = game.input.x;
        x -= this.paddle.width;
        if (x<110) x = 110;
        if (x + this.paddle.width>350) x = 350-this.paddle.width;
        this.paddle.position.x = x;
        if (window.ballOnPaddle) {
            this.ball.position.setTo(this.paddle.position.x, 300);
        }

        game.physics.arcade.collide(this.wallTop, this.ball);
        game.physics.arcade.collide(this.wallLeft, this.ball);
        game.physics.arcade.collide(this.wallRight, this.ball);

        game.physics.arcade.collide(this.ball, this.bgroup, this.hit, null, this);
        game.physics.arcade.collide(this.wallNet, this.ball, this.die, null, this);
        game.physics.arcade.collide(this.paddle, this.ball);

    }

  , hit: function(ball, brick) {
        brick.kill();
        window.score += 10;

        var activeBlocks = 0;
        [].forEach.call(this.blocks, function(row) {
            [].forEach.call(row, function(b) {
                if (b.exists) activeBlocks++;
            });
        });

        if (activeBlocks < 1) {
            console.log('board cleared! extra life!');
            this.lives += 1;

            // reset the ball
            this.ball.position.setTo(this.paddle.position.x, 300);
            this.ball.body.velocity.setTo(0,0);
            window.ballOnPaddle = true;

            var self = this;
            setTimeout(function() {
                self.ball.body.velocity.setTo(300, -300);
                window.ballOnPaddle = false;
            }, 2000); // give a little extra delay

            // repopulate
            this.blocks = [];
            var yOffset = 90;
            var xOffset = 120;
            for (var y=0; y<4; y++) {
                var row = [];
                for (var x=0; x<3; x++) {
                    var s = game.add.sprite(0,0, 'themeatly', 57, this.bgroup);
                    s.anchor.setTo(0.5, 0.5);
                    s.scale.setMagnitude(0.2);
                    s.position.setTo(xOffset + (x*80), yOffset + (y*40));
                    s.alpha = 1;
                    row.push(s);
                }
                this.blocks.push(row);
            }
            this.bgroup.setAll('body.immovable', true); 
        }
    }

  , die: function() {
        this.lives -= 1;
        if (this.lives < 1) {
            var hiscore = gameConfig.hiscore || 0;

            if (window.score >= hiscore) {
                console.log('new high score!');
                gameConfig.hiscore = score;
                saveGameConfig();
            }
            game.state.start('credits');

        } else {
            console.log('%s lives left', this.lives);

            this.ball.position.setTo(this.paddle.position.x, 300);
            this.ball.body.velocity.setTo(0,0);
            window.ballOnPaddle = true;

            var self = this;
            setTimeout(function() {
                self.ball.body.velocity.setTo(300, -300);
                window.ballOnPaddle = false;
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

  , fadeOut: function() {
        if ((! this.text1) || (! this.text1.exists)) return;

        this.text1.alpha -= 0.1;
        if (this.text2 && this.text2.exists) this.text2.alpha = this.text1.alpha;

        if (this.text1.alpha > 0) {
            var self = this;
            setTimeout(function() { self.fadeOut.call(self); }, 150);

        } else {
            this.text1.kill(); //FIXME: create a new text1 for fadeOut on "level" change
            this.text2.kill();

            // fake a glitch; blocks are the wrong frame, we'll change them to the proper frame in a few seconds...
            this.elglitch.alpha = 1;

            [].forEach.call(this.blocks, function(row) {
                [].forEach.call(row, function(block) {
                    block.alpha = 1;
                });
            });
            this.paddle.alpha = 1;
            this.ball.alpha = 1;

            var self = this;
            setTimeout(function() {
                // end glitch
                [].forEach.call(self.blocks, function(row) {
                    [].forEach.call(row, function(block) {
                        block.frame = 58;
                    });
                });

                self.elglitch.alpha = 0;
                self.ball.body.velocity.setTo(300, -300);
                window.ballOnPaddle = false;
            }, 5000);
        }
    }
  
  , render: function() {
        if (gameConfig.debug) game.debug.inputInfo(32, 32);
/*
        game.debug.body(this.wallTop);
        game.debug.body(this.wallLeft);
        game.debug.body(this.wallRight);
        game.debug.body(this.wallNet);
*/
    }
});
