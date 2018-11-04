import { Meteor } from 'meteor/meteor';
import { BusinessAreas } from '../../../../lib/schemas/businessArea';
import { Swots } from '../../../../lib/schemas/swot';
import { UserTasks } from '../../../../lib/schemas/userTask';

if (Meteor.isServer) {
  Meteor.methods({
    'insertSwot'(swot, swotTasks, userId) {
      try {
        const newSwotId = Swots.insertSwot(swot, userId);
        UserTasks.insertSwotTasks(swotTasks, userId);
        return newSwotId;
      } catch (exception) {
        console.log(exception);
        return exception;
      }
    }
  });
}
