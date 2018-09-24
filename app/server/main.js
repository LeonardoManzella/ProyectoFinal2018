import { Meteor } from 'meteor/meteor';
import '../imports/api/server/methods/userMethods';
import '../imports/api/server/methods/planMethods';
import '../imports/api/server/methods/businessAreasMethods';
import '../imports/api/server/methods/swotMethods';
import '../imports/api/server/methods/riskMethods';
import '../imports/api/server/methods/numericProjectionsMethods';
import '../imports/api/server/activitiesPublications';
import '../imports/api/server/publications/userTaskPublications';
import '../imports/api/server/publications/businessAreasPublications';
import '../imports/api/server/publications/swotPublications';
import '../imports/api/server/publications/risksPublications';
import '../imports/api/server/publications/numericProjectionPublications';
import { Accounts } from 'meteor/accounts-base';

Accounts.onCreateUser((options, user) => {
  user.personalInformation = {
    status: 'pendingChatbot',
    name: options.name,
    surname: options.surname
  };
  user.roles = [];
  user.roles.push('entrepreneur');
  user.goals = [];
  user.contributions = [];
  user.identity_traits = [];
  user.perpetual_identity = [];
  return user;
});

Meteor.publish("userData", function() {
  return Meteor.users.find({_id: Meteor.userId()},
    {fields: {'personalInformation': 1, 'roles': 1, 'createdAt': 1, "executiveUnitId": 1}});
});

Meteor.startup(() => {
  
});
