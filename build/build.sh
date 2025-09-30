#!/bin/bash

# Download waitForKeyElements.js & move to ~/deploy/
git clone https://github.com/CoeJoder/waitForKeyElements.js.git git_waitForKeyElements
mv -f git_waitForKeyElements/waitForKeyElements.js deploy/waitForKeyElements.min.js

# Download jquery/jquery & Move to directory
npm i jquery
mv -f node_modules/jquery/dist/jquery.min.js deploy/jquery.min.js

# Build .crx Chrome Extension File
