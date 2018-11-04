import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { UserTasks } from '../../../../lib/schemas/userTask';
import Canvas from '../../components/canvas/Canvas';
import { BusinessAreas } from '../../../../lib/schemas/businessArea';

const CanvasContainer = withTracker((props) => {
  const canvasSubs = Meteor.subscribe('getBusinessAreas', props.userId);
  const loading = !canvasSubs.ready();
  const businessAreas = BusinessAreas.find().fetch();
  return {
    loading,
    businessAreas
  };
})(Canvas);

export default CanvasContainer;
