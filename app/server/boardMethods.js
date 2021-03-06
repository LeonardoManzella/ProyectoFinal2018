import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Boards } from '/lib/schemas/board';
import { UserTasks } from '../lib/schemas/userTask';
 
if (Meteor.isServer) {

  Meteor.publish('boards', function boardsPublication(userId) {
    return Boards.find({userId: userId ? userId : Meteor.userId()});
  });

  Meteor.methods({
    // 'boards.insertFirstTime'() {
    //   if(!Boards.findOne()){
    //     const data = {
    //       lanes: [
    //         {
    //         id: 'lane1',
    //         title: 'Planned Tasks',
    //         label: '2/2',
    //         cards: [
    //           {id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins'},
    //           {id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: {sha: 'be312a1'}}
    //         ]
    //         },
    //         {
    //         id: 'lane2',
    //         title: 'Completed',
    //         label: '0/0',
    //         cards: []
    //         }
    //       ]
    //     }
    //     Boards.insert(data);
    //   }
    // },
    // 'boards.insert'(data) {
    //   console.log("calling insertBoard");
    //   Boards.insert(data);
    // },
    'boards.update'(lanes) {
      const board = Boards.findOne({userId: Meteor.userId()});
      if (!board) {
        Boards.insert({
          userId: Meteor.userId(),
          lanes: lanes
        });
      } else {
        console.log("calling updateBoard");
        Boards.update({_id: board._id}, {$set: {lanes}});
      }
    },
    'boards.markTaskCompleted'(taskIndex, userTaskId) {
      const userTask = UserTasks.findOne({_id: userTaskId});
      const newTask = userTask.tasks[taskIndex];
      newTask.completed = !newTask.completed;
      userTask.tasks[taskIndex] = newTask;
      UserTasks.update({_id: userTaskId}, {$set: userTask});
    }
  });

}