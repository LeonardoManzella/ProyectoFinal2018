import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { UserTasks } from '../../../../lib/schemas/userTask';
import PlanPage from '../../components/plans/PlanPage';

const getPlansFromUserTasks = (userTasks) => {
  const planTypeList = userTasks.map(userTask => {
    const planItems = userTask.tasks.map(task => ({
      responsible: task.responsibleID,
      supervisor: task.supervisorID,
      tool: task.taskDescription,
      frequency: task.frequency.value
    }));
    return {
      name: userTask.subtype,
      data: {
        planArea: userTask.businessArea,
        planItems
      },
      editable: false
    };
  });
  return planTypeList;
};

const PlanContainer = withTracker(() => {
  const planSubs = Meteor.subscribe('getPlanUserTasks');
  const loading = !planSubs.ready();
  const userTasks = UserTasks.find().fetch();
  const planTypeList = getPlansFromUserTasks(userTasks);
  return {
    loading,
    planTypeList
  };
})(PlanPage);

export default PlanContainer;
