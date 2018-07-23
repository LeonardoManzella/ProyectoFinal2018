import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MainHeaderContainer from './sharedComponents/MainHeaderContainer';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { push as Menu } from 'react-burger-menu';
import ExpertChatbot from './expertChatbot/ExpertChatbot';

export default class MainLayout extends Component {

  adjustScreen(event) {
    if (event.isOpen) {
      document.getElementById("page-wrap").setAttribute("class", "page-wrapper");
    } else {
      document.getElementById("page-wrap").removeAttribute("class", "page-wrapper");
    }
  }

  getBurgerIcon() {
    return (
      <div>
        <img src="/img/chatbot.png" />
      </div>
    );
  }

  render() {
    const { content } = this.props;
    return (
      <div>
        <div className="chatbot-menu">
          <Menu
            onStateChange={this.adjustScreen.bind(this)}
            customBurgerIcon={this.getBurgerIcon()}
            right noOverlay
          >
            <ExpertChatbot />
          </Menu>
        </div>
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

