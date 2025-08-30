#!/bin/bash

if ! 'wget -O waitForKeyElements.js "https://gist.github.com/raw/2625891/waitForKeyElements.js"'; then
  echo "ERROR: can't get archive" >&2
  exit 1
fi

ls -l

