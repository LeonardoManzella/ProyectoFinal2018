import { Meteor } from 'meteor/meteor';
import { publishComposite } from 'meteor/reywood:publish-composite';
import { UserTasks } from '../../../../lib/schemas/userTask';
import { Risks } from '../../../../lib/schemas/risk';

publishComposite('getRisks', function(userId) {
  return {
    find() {
      return Risks.find({userId: userId ? userId : this.userId});
    },
    children: [
      {
        find(risk) {
          if (!risk.userTasksId) {
            return '';
          }
          return UserTasks.find({_id: risk.userTasksId});
        }
      }
    ]
  };
});
