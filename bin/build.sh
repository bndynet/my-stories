#!/bin/bash
source ./bin/vars.sh

cmd="npm install ${lib_names[@]} && npm i && npm run build"
eval $cmd
