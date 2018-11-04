import { Meteor } from 'meteor/meteor';
import { Risks } from '../../../../lib/schemas/risk';
import { UserTasks } from '../../../../lib/schemas/userTask';

if (Meteor.isServer) {
  Meteor.methods({
    'insertRisks'(risks, contingencyPlans, userId) {
      try {
        Risks.insertRisks(risks, userId);
        UserTasks.insertContingencyPlans(contingencyPlans, userId);
      } catch (exception) {
        console.log(exception);
        return exception;
      }
    }
  });
}
