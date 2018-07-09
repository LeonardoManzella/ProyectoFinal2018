import { Meteor } from 'meteor/meteor';
import { UserTasks } from '../../../../lib/schemas/userTask';

Meteor.publish('getPlanUserTasks', function() {
  return UserTasks.find({userId: this.userId, type: 'plan'});
});
