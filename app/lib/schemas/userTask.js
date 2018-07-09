import SimpleSchema from  'simpl-schema';
import { Mongo } from 'meteor/mongo';
import { Swots } from './swot';

export const UserTasks = new Mongo.Collection('userTasks');

const frequencySchema = new SimpleSchema({
  type: {
    type: String,
    label: "type"
  },
  value: {
    type: String,
    label: "value"
  },
  time: {
    type: String,
    label: "time"
  }
});

const taskSchema = new SimpleSchema({
  responsibleID: {
    type: String,
    label: "responsibleID"
  },
  supervisorID: {
    type: String,
    label: "supervisorID",
    optional: true
  },
  taskDescription: {
    type: String,
    label: "taskDescription"
  },
  frequency: {
    type: frequencySchema,
    label: "frequency"
  }
});

const userTasksSchema = new SimpleSchema({
  userId: {
    type: String,
    label: "userId"
  },
  businessArea: {
    type: String,
    label: "businessArea",
    defaultValue: 'all',
    optional: true
  },
  type: {
    type: String,
    label: "type"
  },
  subtype: {
    type: String,
    label: "subtype",
    optional: true
  },
  tasks: {
    type: Array,
    optional: true,
    label: "tasks"
  },
  'tasks.$': {
    type: taskSchema,
  },
  createdAt: {
    type: Date,
    autoValue: function() { if (!this.isSet) return new Date(); else return undefined; },
  }
});

UserTasks.insertPlanList = (plans) => {
  plans.forEach(plan => {
    plan.planTypeList.map(planType => {
      const businessArea = planType.data.planArea ? planType.data.planArea : 'all';
      const userTasks = {};
      UserTasks.remove({type: 'plan', subtype: plan.name, businessArea, userId: Meteor.userId()})
      userTasks.userId = Meteor.userId();
      userTasks.type = 'plan';
      userTasks.subtype = plan.name;
      userTasks.businessArea = businessArea;
      userTasks.tasks = planType.data.planItems.map(planItem => ({
        responsibleID: planItem.responsible,
        supervisorID: planItem.supervisor,
        taskDescription: planItem.tool,
        frequency: {
          type: 'everyDay',
          value: planItem.frequency,
          time: 'day'
        }
      }));
      UserTasks.insert(userTasks);
    });
  });
};

UserTasks.insertSwotTasks = (swotTasks) => {
  UserTasks.remove({userId: Meteor.userId(), type: 'swot'});
  Swots.removeUserTaskIds();
  swotTasks.forEach(swotTask => {
    const newSwotTask = {
      responsibleID: swotTask.responsible,
      supervisorID: swotTask.supervisor,
      taskDescription: swotTask.tool,
      frequency: {
        type: 'everyDay',
        value: swotTask.frequency,
        time: 'day'
      }};
    const swotElement = Swots.findOne({userId: Meteor.userId(), description: swotTask.element});
    if (swotElement) {
      if (!swotElement.userTasksId) {
      const userTask = {};
      userTask.userId = Meteor.userId();
      userTask.type = 'swot';
      userTask.tasks = [newSwotTask];
      const newUserTaskId = UserTasks.insert(userTask);
      Swots.updateUserTaskId(swotElement._id, newUserTaskId);
      } else {
        UserTasks.update({_id: swotElement.userTasksId}, {$push: {tasks: newSwotTask}})
      }
    }
  });
}

UserTasks.attachSchema(userTasksSchema);
