#!/bin/sh

#echo "#######################################################################################"
#echo 

LOG_PATH="/data/logs/"
LOG_FILE="mongod-enfocarte.log"
DB_PATH="/data/db-enfocarte/"
PORT="27058"

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
