import { Meteor } from 'meteor/meteor';
import { BusinessAreas } from '../../../../lib/schemas/businessArea';

Meteor.publish('getBusinessAreas', function() {
  return BusinessAreas.find({userId: this.userId});
});
