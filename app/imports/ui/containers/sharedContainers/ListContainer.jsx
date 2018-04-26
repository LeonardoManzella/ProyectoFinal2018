import List from '../../components/sharedComponents/List';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { TAPi18n } from 'meteor/tap:i18n';

const ListContainer = withTracker((props) => {
  const subs = Meteor.subscribe(props.subscription, props.subscriptionParameters);
  const loading = !subs.ready();

  const renderCard = props.renderCard;
  let emptyMessage = '';

  const sectionsData = props.getSections();
  const sectionNames = Object.keys(sectionsData);
  const sections = Object.values(sectionsData);

  if (sectionsData.isEmptyResult
    || sections.length === 0
    || sections[0].length === 0) {
    emptyMessage = TAPi18n.__('noData.noResults');
  }

  return {
    loading,
    sections,
    renderCard,
    sectionNames,
    emptyMessage
  };
})(List);

export default ListContainer;
