import SimpleSchema from  'simpl-schema';
import { Mongo } from 'meteor/mongo';
import { Swots } from './swot';
import { Risks } from './risk';

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
  },
  status: {
    type: String,
    label: "status",
    optional:true
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

//Fixme: arreglar codigo repetido
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

UserTasks.insertContingencyPlans = (contingencyPlans) => {
  UserTasks.remove({userId: Meteor.userId(), type: 'contingencyPlan'});
  Risks.removeUserTaskIds();
  contingencyPlans.forEach(contingencyPlan => {
    const newContingencyPlanTask = {
      responsibleID: contingencyPlan.responsible,
      supervisorID: contingencyPlan.supervisor,
      taskDescription: contingencyPlan.tool,
      frequency: {
        type: 'everyDay',
        value: contingencyPlan.frequency,
        time: 'day'
      }};
    const risk = Risks.findOne({userId: Meteor.userId(), risk: contingencyPlan.element});
    if (risk) {
      if (!risk.userTasksId) {
        const userTask = {};
        userTask.userId = Meteor.userId();
        userTask.type = 'contingencyPlan';
        userTask.tasks = [newContingencyPlanTask];
        const newUserTaskId = UserTasks.insert(userTask);
        Risks.updateUserTaskId(risk._id, newUserTaskId);
      } else {
        UserTasks.update({_id: risk.userTasksId}, {$push: {tasks: newContingencyPlanTask}})
      }
    }
  });
}

UserTasks.updateReminders = (reminders) => {
  reminders.forEach(reminder => {
    const existingReminder = UserTasks.findOne({userId: reminder.entrepreneur, type: 'reminder'});
    const newReminderTask = {
      responsibleID: reminder.entrepreneur,
      taskDescription: reminder.businessName,
      frequency: {
        type: 'everyDay',
        value: reminder.frequency,
        time: 'day'
      },
      status: reminder.status
    };
    if (!existingReminder) {
      const userTask = {};
      userTask.userId = reminder.entrepreneur;
      userTask.type = 'reminder';
      userTask.tasks = [newReminderTask];
      UserTasks.insert(userTask);
    } else {
      UserTasks.update({userId: reminder.entrepreneur, type: 'reminder'},
        {$set: {tasks: [newReminderTask]}});
    }
  });
}

UserTasks.attachSchema(userTasksSchema);
