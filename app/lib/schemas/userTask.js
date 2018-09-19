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
  secondaryValue: {
    type: String,
    label: "value",
    optional: true
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
  },
  completed: {
    type: Boolean,
    label: "completed",
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
        responsibleID: planItem.data.responsible,
        supervisorID: planItem.data.supervisor,
        taskDescription: planItem.data.tool,
        frequency: {
          type: planItem.data.frequencyType,
          value: planItem.data.frequencyValue,
          secondaryValue: planItem.data.frequencySecondValue,
          time: planItem.data.frequency
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

UserTasks.obtainScheduledTasks = async () => {
  // TODO use MongoDB Querys
  // var fiber_function = Meteor.bindEnvironment( function() {
  // UserTasks.aggregate([
  //     { $unwind: "$tasks" }
  //   ]);
  // });
  // let daily_tasks = fiber_function();
  
  // const callback_fun = function(resolve) {
  //   return function(err, result) {
  //     if(err) {
  //       console.log("=== ERROR ===");
  //       console.log(err);
  //     }else{
  //       console.log("=== Result ===");
  //       console.log(result);
  //       resolve(resolve);
  //     }
  //   }
  // };
  // const callback_fun = function(err, result) {
  //     if(err) {
  //       console.log("=== ERROR ===");
  //       console.log(err);
  //     }else{
  //       console.log("=== Result ===");
  //       console.log(result);
  //       resolve(resolve);
  //     }
  // };

  //var fiber_function = Meteor.bindEnvironment( callback_fun );
  const queryDailyTasks = [
    { $unwind: "$tasks" }
    // ,
    // { $match: { $and:[
    //     { 'tasks.frequency.type': { $eq: "dayAmount" }}
    //     , 
    //     {userId: "8x7t9Ck8YzZ7nNwYG"}
    // ]}}
  ];

  // let promise = new Promise((resolve) => {
  //           (async () => { 
  //               UserTasks.rawCollection().aggregate(query, callback_fun(resolve));
  //           })().catch((err) => {
  //               console.error(err); 
  //               console.trace();
  //           });
  //       });
  //       Promise.await(promise);
  //       console.log("== PROMISE ==");
  //       console.log(JSON.stringify(promise));
  //       promise.then(result =>{
  //         return result;
  //       });
  // function somethingSync(queryToExecute){
  //     var ret = undefined; //the result-holding variable
  //     //doing something async here...
  //     console.log("somethingSync started");
  //     UserTasks.rawCollection().aggregate(
  //       queryToExecute,
  //       function(err, result) {
  //         console.log("callback");
  //         if(err) {
  //           console.log("=== ERROR ===");
  //           console.log(err);
  //         }else{
  //           console.log("=== Result ===");
  //           console.log(result);
  //           ret = result;
  //         }
  //       }
  //     );

  //     console.log("after call");
  //     while(ret === undefined){} //wait for the result until it's available, cause the blocking
      
  //     console.log("after while");
  //     return ret;
  // }
  // var result = somethingSync(query);

  function queryAggregate (queryToExecute) {
    return new Promise(function (resolve) {
      UserTasks.rawCollection().aggregate(
        queryToExecute,
        function(err, result) {
          console.log("callback");
          if(err) {
            console.log("=== ERROR ===");
            console.log(err);
          }else{
            console.log("=== Result ===");
            console.log(result);
            resolve(result);
          }
        }
      );
    })
  }
  var daily_tasks = await queryAggregate(queryDailyTasks);

  // var syncFunc = Async.wrap(UserTasks.rawCollection().aggregate);
  // var result = syncFunc(query, callback_fun);
  //var result = syncFunc(query, fiber_function);
  // console.log("=== SYNC RESULT ===");
  // console.log(result);
//   var daily_tasks = UserTasks.rawCollection().aggregate([
//     { $unwind: "$tasks" }
//     // ,
//     // { $match: { $and:[
//     //     { 'tasks.frequency.type': { $eq: "dayAmount" }}
//     //     , 
//     //     {userId: "8x7t9Ck8YzZ7nNwYG"}
//     // ]}}
// ], callback_fun);
console.log("daily_tasks obtained:");
console.log(daily_tasks);
  
  // TODO Apply filter logic
  // TODO merge arrays
  // TODO map array to transform tasks format, see format inside sendgrid.js 
  return daily_tasks;
}

UserTasks.attachSchema(userTasksSchema);
