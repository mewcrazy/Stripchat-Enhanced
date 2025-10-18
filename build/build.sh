#!/bin/bash

# Download waitForKeyElements.js & move to ~/deploy/
git clone https://github.com/CoeJoder/waitForKeyElements.js.git git_waitForKeyElements
mv -f git_waitForKeyElements/waitForKeyElements.js deploy/waitForKeyElements.min.js

# Download jquery/jquery & Move to directory
npm i jquery
npm audit fix --force
rm extensions/chrome/js/jquery.min.js
cp -rf ../../../../node_modules/jquery/dist/jquery.min.js deploy/jquery.min.js

# Build .crx Chrome Extension File
/usr/local/bin/crx3 extensions/chrome -o extensions/chrome.crx -p /home/githubrunner/extension_keys/chrome.pem

# Build Firefox Extension File
/usr/local/bin/web-ext build -o -s extensions/chrome -a ./extensions -n firefox.zip

# Build Opera Extension File
/usr/local/bin/crx3 extensions/chrome -o extensions/opera.crx -p /home/githubrunner/extension_keys/opera.pem