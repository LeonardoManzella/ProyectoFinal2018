import Header from '../../components/sharedComponents/Header';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

const HeaderContainer = withTracker((props) => {
  const renderTitle = props.renderTitle;

  return {
    renderTitle
  };
})(Header);

export default HeaderContainer;
