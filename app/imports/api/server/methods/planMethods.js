import { Meteor } from 'meteor/meteor';
import { UserTasks } from '../../../../lib/schemas/userTask';

if (Meteor.isServer) {
  Meteor.methods({
    'insertNewPlanList'(plans) {
      try {
        const newPlanId = UserTasks.insertPlanList(plans);
        return newPlanId;
      } catch (exception) {
        console.log(exception);
        return exception;
      }
    }
  });
}
