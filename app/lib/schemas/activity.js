import SimpleSchema from  'simpl-schema';
import { Mongo } from 'meteor/mongo';

export const Activities = new Mongo.Collection('activities');

const activitySchema = new SimpleSchema({
  type: {
    type: String,
    label: "type"
  },
  subtype: {
    type: String,
    label: "subtype",
    optional: true
  },
  createdBy: {
    type: String,
    label: "createdBy"
  },
  createdAt: {
    type: Date,
    autoValue: function() { if (!this.isSet) return new Date(); else return undefined; },
  },
  title: {
    type: String,
    label: "title",
    optional: true
  },
  postTitle: {
    type: String,
    label: "postTitle",
    optional: true
  },
  extraTitle: {
    type: String,
    label: "extraTitle",
    optional: true
  },
  projectName: {
    type: String,
    label: "projectName",
    optional: true
  },
  userId: {
    type: String,
    label: "userId",
    optional: true
  },
  pendingUserId: {
    type: String,
    label: "userId",
    optional: true
  },
  roles: {
    type: Array,
    optional: true,
    label: "roles"
  },
  'roles.$': {
    type: String,
  },
  userIds: {
    type: Array,
    optional: true,
    label: "userIds"
  },
  'userIds.$': {
    type: String,
  },
  actionDescription: {
    type: String,
    label: "actionDescription",
    optional: true
  },
  projectId: {
    type: String,
    label: "projectId",
    optional: true
  },
  redirect: {
    type: String,
    label: "redirect",
    optional: true
  },
  paramsKeys: {
    type: Array,
    label: "paramsKeys",
    optional: true
  },
  'paramsKeys.$': {
    type: String,
  },
  paramsValues: {
    type: Array,
    label: "paramsKeys",
    optional: true
  },
  'paramsValues.$': {
    type: String,
  },
  queryParamsKeys: {
    type: Array,
    label: "paramsKeys",
    optional: true
  },
  'queryParamsKeys.$': {
    type: String,
  },
  queryParamsValues: {
    type: Array,
    label: "paramsKeys",
    optional: true
  },
  'queryParamsValues.$': {
    type: String,
  },
  descriptions: {
    type: Array,
    label: "description",
    optional: true
  },
  'descriptions.$': {
    type: String,
  },
  hash: {
    type: String,
    label: "hash",
    optional: true
  },
  status: {
    type: String,
    label: "status",
    optional: true
  },
  modalAction: {
    type: String,
    label: "modalAction",
    optional: true
  },
  activityParamsNames: {
    type: Array,
    label: "activityParamsNames",
    optional: true
  },
  'activityParamsNames.$': {
    type: String,
  },
  activityParams: {
    type: Array,
    label: "activityParams",
    optional: true
  },
  'activityParams.$': {
    type: String,
  },
  stateParamsNames: {
    type: Array,
    label: "stateParamsNames",
    optional: true
  },
  'stateParamsNames.$': {
    type: String,
  },
  stateParams: {
    type: Array,
    label: "stateParams",
    optional: true
  },
  'stateParams.$': {
    type: String,
  },
  modalName: {
    type: String,
    label: "modalName",
    optional: true
  }
});

Activities.attachSchema(activitySchema);
