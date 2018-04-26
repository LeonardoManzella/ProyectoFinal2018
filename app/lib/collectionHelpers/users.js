import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';

Meteor.users.helpers({
  canEditProjectData() {
    return Roles.userIsInRole(this._id, ['projectManager']);
  },
  canUploadBudget() {
    return Roles.userIsInRole(this._id, ['projectManager']);
  },
  canCreateProjects() {
    return Roles.userIsInRole(this._id, ['projectManager']);
  },
  canCreateExecutiveUnits() {
    return Roles.userIsInRole(this._id, ['projectManager']);
  },
  canMakeComments() {
    return Roles.userIsInRole(this._id, ['provider', 'projectManager', 'executiveDirector', 'administrativeAssistant']);
  },
  canViewDocumentsList() {
    return Roles.userIsInRole(this._id, ['projectManager', 'executiveDirector', 'administrativeAssistant']);
  },
  canUploadDocuments() {
    return Roles.userIsInRole(this._id, ['executiveDirector', 'administrativeAssistant']);
  },
  canUploadAcquisitionPlan() {
    return Roles.userIsInRole(this._id, ['executiveDirector', 'administrativeAssistant']);
  },
  canMakeObjections() {
    return Roles.userIsInRole(this._id, ['projectManager']);
  },
  canMakeProjectFileObjections() {
    return Roles.userIsInRole(this._id, ['projectManager', 'executiveDirector']);
  },
  canObjectFile(approverRole) {
    return Roles.userIsInRole(this._id, [approverRole]);
  },
  canViewAcquisitionPlan() {
    return Roles.userIsInRole(this._id, ['projectManager', 'executiveDirector', 'administrativeAssistant']);
  },
  canCreateNewUsers() {
    return Roles.userIsInRole(this._id, ['projectManager', 'executiveDirector']);
  },
  canCreateNewProvider() {
    return Roles.userIsInRole(this._id, ['executiveDirector']);
  },
  canViewBiddingsList() {
    return Roles.userIsInRole(this._id, ['projectManager', 'executiveDirector', 'administrativeAssistant']);
  },
  canViewBiddingProvidersList() {
    return Roles.userIsInRole(this._id, ['projectManager', 'executiveDirector', 'administrativeAssistant']);
  },
  canViewUserList() {
    return Roles.userIsInRole(this._id, ['projectManager', 'executiveDirector']);
  },
  canViewBiddingList() {
    return Roles.userIsInRole(this._id, ['provider']);
  },
  canAddProviderToBidding() {
    return Roles.userIsInRole(this._id, ['executiveDirector', 'administrativeAssistant']);
  },
  canCreatePaymentOrder() {
    return Roles.userIsInRole(this._id, ['executiveDirector', 'administrativeAssistant']);
  },
  canEndSubactivity() {
    return Roles.userIsInRole(this._id, ['executiveDirector', 'administrativeAssistant']);
  },
  getRole() {
    return this._id.roles[0];
  }
});
