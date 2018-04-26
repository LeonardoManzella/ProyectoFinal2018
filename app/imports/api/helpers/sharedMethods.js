import { Meteor } from 'meteor/meteor';
import React from 'react';
import { validationsHelper } from './validationsHelper';
import { Roles } from 'meteor/alanning:roles';
import { TAPi18n } from 'meteor/tap:i18n';
import { FlowRouter } from 'meteor/kadira:flow-router';

const getRolesDescriptions = (roles) => {
  let rolesDescription = '';
  roles.forEach(role => {
    rolesDescription += TAPi18n.__('user.roles.' + role) + ', ';
  });
  const lastCommaIndex = rolesDescription.lastIndexOf(', ');
  return rolesDescription.substring(0, lastCommaIndex);
};

const getUsersFullName = (user) => {
  if (user && user.personalInformation) {
    return user.personalInformation.name + ' ' + user.personalInformation.surname;
  }
  return '-';
};

const getFullName = (userId) => {
  let name = '';
  const user = Meteor.users.findOne({_id: userId});
  if (user && user.personalInformation) {
    name = getUsersFullName(user);
  }
  return name;
};

const SharedMethods = {
  getFullName,
  getUsersFullName,
  getRolesDescriptions
};

export default SharedMethods;
