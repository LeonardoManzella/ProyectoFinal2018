#!/bin/sh

#echo "#######################################################################################"
#echo 

LOG_PATH="/data/logs/"
LOG_FILE="mongod-botigo.log"
PORT="27059"

echo ""
echo "########################################"
echo "### Starting MongoDB" 
echo "### LOG_PATH: $LOG_PATH"
echo "### LOG_FILE: $LOG_FILE"
echo "### PORT: $PORT"
echo ""
echo ""
sudo mongod --port $PORT --fork --logpath $LOG_PATH$LOG_FILE && echo "### MongoDB Started" && echo "########################################"
