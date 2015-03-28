meatlyjam
=========
An entry for MeatlyJam #1 http://www.meatlyjam.com/

setup
-----

For convenience, install these globally:

    $ npm install -g http-server
    $ npm install -g bower
    $ npm install -g browserify
    $ npm install -g uglify-js

Then clone & build:

    $ git clone https://github.com/psema4/meatlyjam.git
    $ cd meatlyjam
    $ npm install
    $ bower install
    $ ./mkbundle.sh

play
----

If you have a preferred web server (apache, nginx, python, etc) simply move or copy the meatlyjam folder into your webspace to host the game.

If you don't, cd into the meatlyjam folder and run the following command:

    $ http-server

and open http://localhost:8080 in your browser.

notes
-----

* Desktop Chrome is the recommended browser during development


