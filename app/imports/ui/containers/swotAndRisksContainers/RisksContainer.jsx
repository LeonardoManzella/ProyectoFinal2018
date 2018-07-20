import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { UserTasks } from '../../../../lib/schemas/userTask';
import { Risks } from '../../../../lib/schemas/risk';
import RisksPage from '../../components/swotAndRisks/RisksPage';

const RisksContainer = withTracker(() => {
  const risksSubs = Meteor.subscribe('getRisks');
  const loading = !risksSubs.ready();
  const risks = Risks.find().fetch();
  const userContingencyPlans = UserTasks.find().fetch();
  const contingencyPlans = [];
  userContingencyPlans.forEach(userContingencyPlan => {
    const element = risks.find(element => element.userTasksId === userContingencyPlan._id);
    if (element && userContingencyPlan.tasks) {
      userContingencyPlan.tasks.forEach(task => 
        contingencyPlans.push({
          element: element.risk,
          responsible: task.responsibleID,
          supervisor: task.supervisorID,
          tool: task.taskDescription,
          frequency: task.frequency.value
        }));
    }
  });
  return {
    loading,
    risks,
    contingencyPlans
  };
})(RisksPage);

export default RisksContainer;
