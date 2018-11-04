import { Meteor } from 'meteor/meteor';
import { UserTasks } from '../../../../lib/schemas/userTask';
import { BusinessAreas } from '../../../../lib/schemas/businessArea';
import { publishComposite } from 'meteor/reywood:publish-composite';

Meteor.publish('getPlanUserTasks', function(userId) {
  return UserTasks.find({userId: userId ? userId : this.userId, type: 'plan', businessArea: 'all'});
});

publishComposite('getUserTasks', function(userId) {
  return {
    find() {
      return UserTasks.find({userId: userId ? userId : this.userId});
    },
    children: [
      {
        find(userTask) {
          if (userTask.type !== 'plan' ||
            (userTask.type === 'plan' && userTask.businessArea === 'all')) {
            return '';
          }
          return BusinessAreas.find({_id: userTask.businessArea});
        }
      }
    ]
  };
});