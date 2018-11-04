import { Meteor } from 'meteor/meteor';
import { NumericProjections } from '../../../../lib/schemas/numericProjection';

Meteor.publish('getnumericProjection', function(userId) {
  return NumericProjections.find({userId: userId ? userId : this.userId});
});

