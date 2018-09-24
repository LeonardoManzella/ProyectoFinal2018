import SimpleSchema from  'simpl-schema';
import { Mongo } from 'meteor/mongo';

export const NumericProjections = new Mongo.Collection('numericProjections');

const rowSchema = new SimpleSchema({
  date: {
    type: String,
    label: "date"
  },
  value: {
    type: String,
    label: "value"
  }
});

const numericProjectionsSchema = new SimpleSchema({
  userId: {
    type: String,
    label: "userId"
  },
  initialCapital: {
    type: String,
    label: "initialCapital",
    optional: true
  },
  periodicity: {
    type: String,
    label: "periodicity",
    optional: true
  },
  amount: {
    type: String,
    label: "amount",
    optional: true
  },
  incomes: {
    type: Array,
    label: "incomes",
    optional: true
  },
  'incomes.$': {
    type: rowSchema,
  },
  costs: {
    type: Array,
    label: "costs",
    optional: true
  },
  'costs.$': {
    type: rowSchema,
  },
  createdAt: {
    type: Date,
    autoValue: function() { if (!this.isSet) return new Date(); else return undefined; },
  }
});

NumericProjections.insertNumericProjection = (numericProjection) => {
  NumericProjections.remove({userId: Meteor.userId()});
  const newNumericProjection = Object.assign({}, numericProjection);
  newNumericProjection.userId = Meteor.userId();
  NumericProjections.insert(newNumericProjection);
};

NumericProjections.attachSchema(numericProjectionsSchema);
