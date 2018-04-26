import { Meteor } from 'meteor/meteor';
import SimpleSchema from  'simpl-schema';

const UserPersonalInformation = new SimpleSchema({
  name: {
    type: String,
  },
  surname: {
    type: String,
  },
  phone: {
    type: Number,
  },
  status: {
    type: String,
    allowedValues: ['pending', 'approved'],
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
