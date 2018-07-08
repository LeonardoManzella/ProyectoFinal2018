import SimpleSchema from  'simpl-schema';
import { Mongo } from 'meteor/mongo';

export const BusinessAreas = new Mongo.Collection('businessAreas');

const competitorsSchema = new SimpleSchema({
  name: {
    type: String,
    label: "name"
  },
  differentiator: {
    type: String,
    label: "differentiator"
  }
});

const businessAreasSchema = new SimpleSchema({
  userId: {
    type: String,
    label: "userId"
  },
  name: {
    type: String,
    label: "name"
  },
  details: {
    type: String,
    label: "details"
  },
  providers: {
    type: String,
    label: "providers"
  },
  clients: {
    type: String,
    label: "clients"
  },
  agglutinators: {
    type: String,
    label: "agglutinators"
  },
  competitors: {
    type: Array,
    label: "competitors"
  },
  'competitors.$': {
    type: competitorsSchema,
  },
  createdAt: {
    type: Date,
    autoValue: function() { if (!this.isSet) return new Date(); else return undefined; },
  }
});

BusinessAreas.insertBusinessAreas = (businessAreas) => {
  businessAreas.forEach(businessArea => {
    if (!businessArea._id) {
      const newBusinessArea = Object.assign({}, businessArea);
      newBusinessArea.userId = Meteor.userId();
      BusinessAreas.insert(newBusinessArea);
    } else {
      BusinessAreas.update({_id: businessArea._id}, {$set: businessArea});
    }
  });
};

BusinessAreas.attachSchema(businessAreasSchema);
