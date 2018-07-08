import { Meteor } from 'meteor/meteor';
import { BusinessAreas } from '../../../../lib/schemas/businessArea';

if (Meteor.isServer) {
  Meteor.methods({
    'insertBusinessAreas'(businessAreas) {
      try {
        const newBusinessAreaId = BusinessAreas.insertBusinessAreas(businessAreas);
        return newBusinessAreaId;
      } catch (exception) {
        console.log(exception);
        return exception;
      }
    }
  });
}
