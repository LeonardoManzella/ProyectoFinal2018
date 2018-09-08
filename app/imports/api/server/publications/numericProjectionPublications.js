import { Meteor } from 'meteor/meteor';
import { NumericProjections } from '../../../../lib/schemas/numericProjection';

Meteor.publish('getnumericProjection', function() {
  return NumericProjections.find({userId: this.userId});
});

