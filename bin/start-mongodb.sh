#!/bin/sh

#echo "#######################################################################################"
#echo 

LOG_PATH="/data/logs/"
LOG_FILE="mongod-enfocarte.log"
PORT="27058"

echo ""
echo "########################################"
echo "### Starting MongoDB" 
echo "### LOG_PATH: $LOG_PATH"
echo "### LOG_FILE: $LOG_FILE"
echo "### PORT: $PORT"
echo ""
echo ""
cd $MYPATH/app && meteor $1 --settings $SETTINGS
sudo mongod --port 27058 --fork --logpath /data/logs/mongod-enfocarte.log && echo "### MongoDB Started" && echo "########################################"
