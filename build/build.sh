#!/bin/bash

# Download npm Modules
npm i jquery uglify-js
npm audit fix --force

# Download waitForKeyElements.js & move to ~/deploy/
git clone https://github.com/CoeJoder/waitForKeyElements.js.git git_waitForKeyElements
cp -rf git_waitForKeyElements/waitForKeyElements.js extensions/chrome/js/waitForKeyElements.min.js

# Download jquery/jquery & Move to directory
rm extensions/chrome/js/jquery.min.js
cp -rf ../../../../node_modules/jquery/dist/jquery.min.js extensions/chrome/js/jquery.min.js

# Obfuscate JavaScript files
# ./../../../../node_modules/javascript-obfuscator/bin/javascript-obfuscator extensions/chrome/foreground.js --output extensions/chrome/foreground-obfuscated.js
# rm extensions/chrome/foreground.js

# Minify JavaScript files
./../../../../node_modules/uglifyjs/bin/uglifyjs --compress --mangle -- extensions/chrome/foreground.js -o extensions/chrome/foreground.min.js

# Build .crx Chrome Extension File
/usr/local/bin/crx3 extensions/chrome -o extensions/chrome.crx -p /home/githubrunner/extension_keys/chrome.pem

# Build Firefox Extension File
/usr/local/bin/web-ext build -o -s extensions/chrome -a ./extensions -n firefox.zip

# Build Opera Extension File
/usr/local/bin/crx3 extensions/chrome -o extensions/opera.crx -p /home/githubrunner/extension_keys/opera.pem