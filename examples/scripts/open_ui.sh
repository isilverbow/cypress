#!/bin/bash

# . open_ui ENV

clear

# $1 = PACKAGE
if [ "$1" == "dev" ]
then
    URL="https://google.com/"

    cd ../

elif [ "$1" == "uat" ]
then
    URL="https://google.com/"

    cd ../

else
    echo $1 "is not a valid environment name. Please try again."
    return
fi

npx cypress open --config-file cypress.json --config  baseUrl=$URL

cd -

return
