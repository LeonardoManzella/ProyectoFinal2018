import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import MainHeader from '../MainHeader';

const MainHeaderContainer = withTracker((props) => {
  const currentUrl = props.currentUrl;
  const userHandle = Meteor.subscribe('getUserLoggedIn');
  //const loading = !userHandle.ready();
  const loading = false;

  //const user = !loading ? Meteor.users.findOne(Meteor.userId()) : {};
  const user = Meteor.users.findOne(Meteor.userId());

  return {
    loading,
    user,
    currentUrl
  };
})(MainHeader);

export default MainHeaderContainer;
