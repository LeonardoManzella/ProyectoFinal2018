function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Scroll from 'react-scroll';
import { TransitionGroup } from 'react-transition-group';

import Animatable from './../Animatable';
import Message from './message/Message';

var Element = Scroll.Element;
var Scroller = Scroll.scroller;

var Messages = function (_Component) {
  _inherits(Messages, _Component);

  function Messages() {
    _classCallCheck(this, Messages);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Messages.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (this.props.messages.length === prevProps.messages.length + 1 || this.props.isTyping !== prevProps.isTyping) {
      if (process.env.MESSAGE_SCROLL_DISABLED !== true) {
        // Is set in tests. `react-scroll` has an issue with execution when run in tests.
        Scroller.scrollTo('LastMessage', {
          duration: 500,
          smooth: true,
          containerId: 'Messages'
        });
      }
    }
  };

  Messages.prototype.render = function render() {
    var messages = this.props.messages.map(function (message, i) {
      return React.createElement(
        Animatable,
        { classNames: 'Messages', key: i },
        React.createElement(Message, message)
      );
    });
    var lastMessage = React.createElement(Element, { name: 'LastMessage' });
    return React.createElement(
      TransitionGroup,
      { component: 'ul', className: 'Messages', id: 'Messages' },
      messages,
      lastMessage
    );
  };

  return Messages;
}(Component);

Messages.defaultProps = {
  messages: []
};

Messages.propTypes = process.env.NODE_ENV !== "production" ? {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired
} : {};

export default Messages;