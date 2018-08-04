import { Meteor } from 'meteor/meteor';
import { BusinessAreas } from '../../../../lib/schemas/businessArea';

if (Meteor.isServer) {
  Meteor.methods({
    'insertBusinessAreas'(businessAreas) {
      try {
        const newBusinessAreaId = BusinessAreas.insertBusinessAreas(businessAreas);
        if (Roles.userIsInRole(Meteor.userId(), ['entrepreneur']) &&
          Meteor.user() && Meteor.user().personalInformation.status === 'pendingAreas') {
          Meteor.users.update({_id: Meteor.userId()}, {$set: {'personalInformation.status': 'pendingPlans'}});
        }
        return newBusinessAreaId;
      } catch (exception) {
        console.log(exception);
        return exception;
      }
    }
  });
}
