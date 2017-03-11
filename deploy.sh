#!/bin/sh

git pull origin master

npm install

kill -9 $(lsof -i:8008 |awk '{print $2}' | tail -n 2)

node app.js &