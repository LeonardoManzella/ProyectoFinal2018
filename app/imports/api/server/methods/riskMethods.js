import { Meteor } from 'meteor/meteor';
import { Risks } from '../../../../lib/schemas/risk';
import { UserTasks } from '../../../../lib/schemas/userTask';

if (Meteor.isServer) {
  Meteor.methods({
    'insertRisks'(risks, contingencyPlans) {
      try {
        Risks.insertRisks(risks);
        UserTasks.insertContingencyPlans(contingencyPlans);
      } catch (exception) {
        console.log(exception);
        return exception;
      }
    }
  });
}
