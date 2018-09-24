import { Meteor } from 'meteor/meteor';
import { NumericProjections } from '../../../../lib/schemas/numericProjection';

if (Meteor.isServer) {
  Meteor.methods({
    'insertNumericProjection'(numericProjection) {
      try {
        const numericProjectionId = NumericProjections.insertNumericProjection(numericProjection);
        return numericProjectionId;
      } catch (exception) {
        console.log(exception);
        throw exception;
      }
    }
  });
}
