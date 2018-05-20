import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Reminders from '../../components/reminders/Reminders';

const RemindersContainer = withTracker(() => {
  
  const reminderSubs = Meteor.subscribe('getUsersEntrepreneur');
  const loading = !reminderSubs.ready();
  const users = Meteor.users.find({roles: 'entrepreneur'}).fetch();

  return {
    loading,
    users
  };
})(Reminders);

export default RemindersContainer;
