import { Meteor } from 'meteor/meteor';
import { Swots } from '../../../../lib/schemas/swot';
import { UserTasks } from '../../../../lib/schemas/userTask';

Meteor.publish('getSwot', function() {
  return Swots.find({userId: this.userId});
});

Meteor.publish('getSwotTasks', function() {
  return UserTasks.find({userId: this.userId, type: 'swot'});
});
