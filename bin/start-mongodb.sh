#!/bin/sh

#echo "#######################################################################################"
#echo 

LOG_PATH="/data/logs/"
LOG_FILE="mongod-botigo.log"
DB_PATH="/data/db-botigo/"
PORT="27059"

echo ""
echo "########################################"
echo "### Starting MongoDB" 
echo "### LOG_PATH: $LOG_PATH"
echo "### LOG_FILE: $LOG_FILE"
echo "### PORT: $PORT"
echo "### EXECUTING: sudo mongod --port $PORT --fork --logpath $LOG_PATH$LOG_FILE --dbpath $DB_PATH"
echo ""
echo ""
sudo mkdir -p $LOG_PATH && \
sudo mkdir -p $DB_PATH && \
sudo mongod --port $PORT --fork --logpath $LOG_PATH$LOG_FILE --dbpath $DB_PATH && echo "### MongoDB Started" && echo "########################################"
