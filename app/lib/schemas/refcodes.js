import { Mongo } from 'meteor/mongo';
import SimpleSchema from  'simpl-schema';

export const Refcodes = new Mongo.Collection('refcodes');

const refcodesSchema = new SimpleSchema({
  userId: {
    type: String
  },
  refcode: {
    type: String
  },
  isActive: {
    type: Boolean,
    autoValue: function() {
      if (this.isInsert) {
        return true;
      } else {
        return this.value;
      }
    }
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (!this.isSet) return new Date(); else return undefined;
    }
  }
});

Refcodes.attachSchema(refcodesSchema);
