import { Meteor } from 'meteor/meteor';

export const rolesByUser = {
  projectManager: [
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


