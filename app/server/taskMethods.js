import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Tasks } from '/lib/schemas/task';
 
if (Meteor.isServer) {

  Meteor.publish('tasks', function tasksPublication() {
    return Tasks.find();
  });

  Meteor.methods({
    'tasks.insert'(text) {
      check(text, String);
  
      // Make sure the user is logged in before inserting a task
      if (! this.userId) {
        throw new Meteor.Error('not-authorized');
      }
      console.log("calling insertTask");
      Tasks.insert({
        text,
        owner: this.userId,
        username: Meteor.users.findOne(this.userId).personalInformation.name,
      });
    },
    'tasks.remove'(taskId) {
      check(taskId, String);
  
      Tasks.remove(taskId);
    },
    'tasks.setChecked'(taskId, setChecked) {
      check(taskId, String);
      check(setChecked, Boolean);
  
      Tasks.update(taskId, { $set: { checked: setChecked } });
    },
  });

}