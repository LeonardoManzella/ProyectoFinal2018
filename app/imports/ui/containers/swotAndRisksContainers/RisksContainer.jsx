import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { UserTasks } from '../../../../lib/schemas/userTask';
import { Risks } from '../../../../lib/schemas/risk';
import RisksPage from '../../components/swotAndRisks/RisksPage';

const RisksContainer = withTracker((props) => {
  const risksSubs = Meteor.subscribe('getRisks', props.userId);
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
          frequency: task.frequency.time,
          frequencyType: task.frequency.type,
          frequencyValue: task.frequency.value,
          frequencySecondValue: task.frequency.secondaryValue
        }));
    }
  });
  return {
    loading,
    risks,
    contingencyPlans,
    userId: props.userId
  };
})(RisksPage);

export default RisksContainer;
