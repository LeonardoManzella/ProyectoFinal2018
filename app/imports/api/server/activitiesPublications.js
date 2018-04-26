import { Meteor } from 'meteor/meteor';
import { publishComposite } from 'meteor/reywood:publish-composite';
import { Activities } from '../../../lib/schemas/activity';
import { Roles } from 'meteor/alanning:roles';


publishComposite('getActivities', function() {
  return {
    find() {
      return Activities.find({});
    },
    children: [
      {
        find(activity) {
          if (activity.type === 'global' || activity.type === 'user') {
            return '';
          }
          if (activity.type === 'pendingUser') {
            return Meteor.users.find({_id: activity.pendingUserId}, {fields: { personalInformation: 1, roles: 1, emails: 1 }} );
          }
          return Meteor.users.find({ _id: activity.createdBy});
        }
      }
    ]
  };
});
