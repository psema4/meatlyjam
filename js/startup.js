window.game.state.add('startup', {
    preload: function() {
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        game.load.spritesheet('themeatly', 'assets/meatlyjam01spritesheet.png', 512, 512);
        game.load.image('meatlyface', 'assets/meatly-face.png', 512, 512);
        game.load.image('meatlypaddle', 'assets/meatly-paddle.png', 413, 99);
        game.load.image('meatlyvpaddle', 'assets/meatly-paddle-vert.png', 99, 413);
        game.load.image('ipadbtn', 'assets/ipad-button.png', 43, 44);
    }

  , create: function() {
        game.stage.backgroundColor = '#ffffff';
    }

  , update: function() {
    }
});
