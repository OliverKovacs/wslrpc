#!/bin/sh
echo "cd $(pwd)\nnohup $(which node) $(pwd)/index.js </dev/null &>/dev/null &\ncd ~" > /etc/profile.d/rpc.sh
