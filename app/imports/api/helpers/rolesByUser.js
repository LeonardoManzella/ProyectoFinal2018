import { Meteor } from 'meteor/meteor';

export const rolesByUser = {
  administrator: [
    "auditor",
    "operationsAnalist",
    "acquisitions",
    "finances"
  ],
  executiveDirector: [
    "generalCoordinator",
    "administrativeAssistant",
    "communitaryCoordinator",
    "technicalCoordinator"
  ]
};

export const getRolesByUser = function() {
  return rolesByUser[Meteor.user().roles[0]];
};


