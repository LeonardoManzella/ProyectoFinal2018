import React, { Component } from 'react';
import ActivityCard from './ActivityCard';
import { Activities } from '../../../../lib/schemas/activity';
import ListContainer from '../../containers/sharedContainers/ListContainer';
import moment from 'moment';
import { TAPi18n } from 'meteor/tap:i18n';
import _ from 'lodash';
import SharedMethods from '../../../api/helpers/sharedMethods';

export default class Activity extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderCard(activity) {
    return <ActivityCard activity={activity}/>;
  }

  getSections() {

    let pendingConditions = {
      $and: [
        {status: 'pending'}
      ]
    };

    let activitiesConditions = {
      $and: [
        {status: {$ne: 'pending'}}
      ]
    };

    const pending = Activities.find(pendingConditions, {sort: {createdAt: -1}}).fetch();
    const activities = Activities.find(activitiesConditions, {sort: {createdAt: -1}}).fetch();
    const dates = _.groupBy(activities, (activity) => moment(activity.createdAt).format('LL'));
    let pendingSection = {};
    if (pending.length > 0) {
      pendingSection = {[TAPi18n.__('status.pending')]: pending};
    }
    const sections = Object.assign(pendingSection, dates);
    return sections;
  }

  render() {
    return (
      <div id="home" className="content-body">
        {/* <ListContainer
          subscription='getActivities'
          collection={Activities}
          renderCard={this.renderCard.bind(this)}
          getSections={this.getSections.bind(this)}
        /> */}
        <h2 style={{textAlign: "center"}}>HOME</h2>
      </div>
    );
  }
}
