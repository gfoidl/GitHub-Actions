#!/usr/bin/env bash

hasFailures=0

for test in out/integrationTests/*.js; do
    testName=$(basename $test)

    if [[ "$testName" == "base.js" ]]; then
        continue
    fi

    alsatian "$test"
    
    if [[ $? != 0 ]]; then
        hasFailures=1
    fi
done

if [[ $hasFailures != 0 ]]; then
    exit 1
fi
