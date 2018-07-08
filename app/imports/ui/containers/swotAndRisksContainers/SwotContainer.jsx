import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Swot from '../../components/swotAndRisks/Swot';
import { Swots } from '../../../../lib/schemas/swot';
import { UserTasks } from '../../../../lib/schemas/userTask';

const SwotContainer = withTracker(() => {
  const swotSubs = Meteor.subscribe('getSwot');
  const swotTasksSubs = Meteor.subscribe('getSwotTasks');
  const loading = !swotSubs.ready() || !swotTasksSubs.ready();
  const userSwot = Swots.find().fetch();
  const swot = {'strengths': [], 'weaknesses': [], 'opportunities': [], 'threats': []};
  userSwot.forEach(element => {
    swot[element.type].push(element.description);
  })
  const userSwotTasks = UserTasks.find().fetch();
  const tasks = [];
  userSwotTasks.forEach(userSwotTask => {
    const element = userSwot.find(element => element.userTasksId === userSwotTask._id);
    if (userSwotTask.tasks) {
      userSwotTask.tasks.forEach(task => 
        tasks.push({
          element: element.description,
          responsible: task.responsibleID,
          supervisor: task.supervisorID,
          tool: task.taskDescription,
          frequency: task.frequency.value
        }));
    }
  });
  return {
    loading,
    swot,
    tasks
  };
})(Swot);

export default SwotContainer;
