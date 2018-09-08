import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import NumericProjection from '../../components/chart/NumericProjection';
import { NumericProjections } from '../../../../lib/schemas/numericProjection';

const NumericProjectionContainer = withTracker(() => {
  const numericProjectionSubs = Meteor.subscribe('getnumericProjection');
  const loading = !numericProjectionSubs.ready();
  const numericProjection = NumericProjections.findOne({userId: Meteor.userId()});
  return {
    loading,
    numericProjection
  };
})(NumericProjection);

export default NumericProjectionContainer;
