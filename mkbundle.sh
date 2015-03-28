#!/usr/bin/bash
echo "creating bundle"
browserify -t debowerify js/game.js js/startup.js js/menu.js js/options.js js/credits.js js/level1 js/level2 js/level3 -o bundle.js
