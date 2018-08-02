import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MainHeaderContainer from './sharedComponents/MainHeaderContainer';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { push as Menu } from 'react-burger-menu';
import SuggestionsChatbot from './suggestionsChatbot/SuggestionsChatbot';

export default class MainLayout extends Component {

  render() {
    const { content } = this.props;
    return (
      <div>
        <main id="page-wrap">
          <MainHeaderContainer
            currentUrl = {FlowRouter.current().path}
          />
          {content}
        </main>
      </div>
    );
  }
}

MainLayout.propTypes = {
  content: PropTypes.object
};

