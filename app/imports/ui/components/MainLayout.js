import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MainHeaderContainer from './sharedComponents/MainHeaderContainer';
import { FlowRouter } from 'meteor/kadira:flow-router';

// App component - represents the whole app
export default class MainLayout extends Component {
  render() {
    const { content } = this.props;

    return (
      <div>
        <MainHeaderContainer
          currentUrl = {FlowRouter.current().path}
        />
        {content}
      </div>
    );
  }
}

MainLayout.propTypes = {
  content: PropTypes.object
};

