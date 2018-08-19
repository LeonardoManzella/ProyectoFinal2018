import { Meteor } from 'meteor/meteor';
import { UserTasks } from '../../../../lib/schemas/userTask';

if (Meteor.isServer) {
  Meteor.methods({
    'insertNewPlanList'(plans) {
      try {
        const newPlanId = UserTasks.insertPlanList(plans);
        if (Roles.userIsInRole(Meteor.userId(), ['entrepreneur']) &&
          Meteor.user() && Meteor.user().personalInformation.status === 'pendingPlans') {
          Meteor.users.update({_id: Meteor.userId()}, {$set: {'personalInformation.status': 'approved'}});
        }
        return newPlanId;
      } catch (exception) {
        console.log(exception);
        throw exception;
      }
    }
  });
}
