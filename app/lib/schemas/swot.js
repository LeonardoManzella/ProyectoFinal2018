import SimpleSchema from  'simpl-schema';
import { Mongo } from 'meteor/mongo';

export const Swots = new Mongo.Collection('swots');

const swotsSchema = new SimpleSchema({
  userId: {
    type: String,
    label: "userId"
  },
  type: {
    type: String,
    label: "type"
  },
  userTasksId: {
    type: String,
    label: "userTasksId",
    optional: true
  },
  description: {
    type: String,
    label: "description",
    optional: true
  },
  genericFodaElementId: {
    type: String,
    label: "genericFodaElementId",
    optional: true
  },
  createdAt: {
    type: Date,
    autoValue: function() { if (!this.isSet) return new Date(); else return undefined; },
  }
});

Swots.insertSwot = (swot) => {
  const swotElements = Swots.find({userId: Meteor.userId()}).fetch()
    .map(element => element.description);
  ['strengths', 'weaknesses', 'opportunities', 'threats'].forEach(swotElement => {
    swot[swotElement].forEach(element => {
      if (!swotElements.includes(element)) {
        const newSwotElement = {};
        newSwotElement.userId = Meteor.userId();
        newSwotElement.type = swotElement;
        newSwotElement.description = element;
        Swots.insert(newSwotElement);
      }
    });
  });
};

Swots.updateUserTaskId = (_id, userTasksId) => {
  Swots.update({_id}, {$set: {userTasksId}});
};

Swots.attachSchema(swotsSchema);
