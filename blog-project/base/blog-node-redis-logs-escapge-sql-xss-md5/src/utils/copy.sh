#!/bin/sh
cd ~/workspace/code-practice/learn-node/blog-project/blog-node-redis-logs/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log