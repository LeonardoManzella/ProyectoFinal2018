#!/bin/sh

#echo "#######################################################################################"
#echo 

MYPATH=$(pwd)
SETTINGS="$MYPATH/settings.json"
export FS_PATH="$HOME/bidFiles"

echo ""
echo "########################################"
echo "### Starting: $DOMAIN"
echo ""
echo ""
echo "########################################"
echo "### Starting server... $1  --settings $SETTINGS"
cd $MYPATH/app && meteor $1 --settings $SETTINGS
