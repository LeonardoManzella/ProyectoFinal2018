import { Meteor } from 'meteor/meteor';
import SimpleSchema from  'simpl-schema';

const UserPersonalInformation = new SimpleSchema({
  name: {
    type: String,
    optional: true
  },
  surname: {
    type: String,
    optional: true
  },
  phone: {
    type: Number,
    optional: true
  },
  status: {
    type: String,
    allowedValues: ['pending', 'pendingChatbot', 'pendingAreas', 'pendingPlans', 'approved']
  }
});

const emailsSchema = new SimpleSchema({
  address: {
    type: String
  },
  verified: {
    type: Boolean
  }
});

const filesSchema = new SimpleSchema({
  fileid: {
    type: String
  },
  name: {
    type: String
  },
  type: {
    type: String
  },
  fileHash: {
    type: String
  },
  createdAt: {
    type: Date,
    autoValue: function() { if (!this.isSet) return new Date(); else return undefined; },
  }
});

const userSchema = new SimpleSchema({
  personalInformation: {
    type: UserPersonalInformation,
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true,
  },
  roles: {
    type: Array,
  },
  'roles.$': {
    type: String
  },
  goals: {
    type: Array,
  },
  'goals.$': {
    type: String
  },
  contributions: {
    type: Array,
  },
  'contributions.$': {
    type: String
  },
  identity_traits: {
    type: Array,
  },
  'identity_traits.$': {
    type: String
  },
  perpetual_identity: {
    type: Array,
  },
  'perpetual_identity.$': {
    type: String
  },
  emails: {
    type: Array
  },
  'emails.$': {
    type: emailsSchema
  },
  createdAt: {
    type: Date,
    autoValue: function() { if (this.isInsert) return new Date(); },
  }
});

Meteor.users.attachSchema(userSchema);
