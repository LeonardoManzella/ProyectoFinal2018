import { Meteor } from 'meteor/meteor';
import { BusinessAreas } from '../../../../lib/schemas/businessArea';
import { Swots } from '../../../../lib/schemas/swot';
import { UserTasks } from '../../../../lib/schemas/userTask';

if (Meteor.isServer) {
  Meteor.methods({
    'insertSwot'(swot, swotTasks) {
      try {
        const newSwotId = Swots.insertSwot(swot);
        UserTasks.insertSwotTasks(swotTasks);
        return newSwotId;
      } catch (exception) {
        console.log(exception);
        return exception;
      }
    }
  });
}
