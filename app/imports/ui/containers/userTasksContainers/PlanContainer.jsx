import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { UserTasks } from '../../../../lib/schemas/userTask';
import { BusinessAreas } from '../../../../lib/schemas/businessArea';
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
  const areasSubs = Meteor.subscribe('getBusinessAreasNames');
  const loading = !planSubs.ready() || !areasSubs.ready();
  const userTasks = UserTasks.find().fetch();
  const planTypeList = getPlansFromUserTasks(userTasks);
  const businessAreas = BusinessAreas.find().fetch();
  return {
    loading,
    planTypeList,
    businessAreas
  };
})(PlanPage);

export default PlanContainer;
