import { Meteor } from 'meteor/meteor';
import { UserTasks } from '../../../../lib/schemas/userTask';

if (Meteor.isServer) {
  Meteor.methods({
    'insertNewPlanList'(plans, userId) {
      try {
        const newPlanId = UserTasks.insertPlanList(plans, userId);
        if (Roles.userIsInRole(Meteor.userId(), ['entrepreneur']) &&
          Meteor.user() && Meteor.user().personalInformation.status === 'pendingPlans') {
          Meteor.users.update({_id: Meteor.userId()}, {$set: {'personalInformation.status': 'approved'}});
        }
        return newPlanId;
      } catch (exception) {
        console.log(exception);
        throw exception;
      }
    },
    'changePlanPendingStatus'() {
      try {
        if (Roles.userIsInRole(Meteor.userId(), ['entrepreneur']) &&
          Meteor.user() && Meteor.user().personalInformation.status === 'pendingPlans') {
          Meteor.users.update({_id: Meteor.userId()}, {$set: {'personalInformation.status': 'approved'}});
        }
      } catch (exception) {
        console.log(exception);
        throw exception;
      }
    }
  });
}
