import { Meteor } from 'meteor/meteor';
import { publishComposite } from 'meteor/reywood:publish-composite';
import { Swots } from '../../../../lib/schemas/swot';
import { UserTasks } from '../../../../lib/schemas/userTask';

publishComposite('getSwot', function() {
  return {
    find() {
      return Swots.find({userId: this.userId});
    },
    children: [
      {
        find(swot) {
          if (!swot.userTasksId) {
            return '';
          }
          return UserTasks.find({_id: swot.userTasksId});
        }
      }
    ]
  };
});
