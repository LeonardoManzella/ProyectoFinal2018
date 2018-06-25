import { Meteor } from 'meteor/meteor';
import '../imports/api/server/methods/userMethods';
import '../imports/api/server/methods/planMethods';
import '../imports/api/server/activitiesPublications';
import '../imports/api/server/publications/userTaskPublications';
import { Accounts } from 'meteor/accounts-base';

Accounts.onCreateUser((options, user) => {
  const personalInformation = Object.assign({}, options);
  delete personalInformation.email;
  delete personalInformation.role;
  if (options.executiveUnitId) {
    delete personalInformation.executiveUnitId;
    user.executiveUnitId = options.executiveUnitId;
  }
  user.originatorId = Meteor.userId();
  user.personalInformation = personalInformation;
  user.roles = [];
  user.roles.push(options.role);
  return user;
});

Meteor.publish("userData", function() {
  return Meteor.users.find({_id: Meteor.userId()},
    {fields: {'personalInformation': 1, 'roles': 1, 'createdAt': 1, "executiveUnitId": 1}});
});

Meteor.startup(() => {
});
