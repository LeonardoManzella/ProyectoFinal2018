import { Meteor } from 'meteor/meteor';
import { publishComposite } from 'meteor/reywood:publish-composite';

Meteor.publish('getUsersNames', function() {
  return Meteor.users.find({}, {fields: {'personalInformation.name': 1,
    'personalInformation.surname': 1, 'roles': 1}});
});

Meteor.publish('getUsers', function() {
  return Meteor.users.find({}, {fields: {'personalInformation.name': 1,
    'personalInformation.surname': 1, 'roles': 1}});
});

Meteor.publish('getUserLoggedIn', function() {
  return Meteor.users.find({_id: this.userId}, {fields: {'personalInformation.name': 1,
    'personalInformation.surname': 1, 'roles': 1}});
});

publishComposite('getFullUser', function() {
  return {
    find() {
      return Meteor.users.find(
        {
          _id: this.userId
        }
      );
    }
  };

});
