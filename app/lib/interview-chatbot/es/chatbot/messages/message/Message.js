function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';

import Animatable from './../../Animatable';
import Text from './content/Text';
import Typing from './content/Typing';

var Message = function (_Component) {
  _inherits(Message, _Component);

  function Message() {
    _classCallCheck(this, Message);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Message.prototype.render = function render() { 
    var _this2 = this;

    var className = 'Message ' + (this.props.isInbound ? 'Inbound' : 'Outbound');
    var content = function () {
      switch (_this2.props.type) {
        case 'text':
          return React.createElement(Text, _this2.props.content);

        case 'typing':
          return React.createElement(Typing, null);
      }
    }();

    return React.createElement(
      TransitionGroup,
      { component: 'li', className: className },
      React.createElement(
        Animatable,
        { classNames: 'Message-Content' },
        React.createElement(
          'div',
          { className: 'Message-Animatable-Container' },
          React.createElement(
            'div',
            { className: 'Message-Content' },
            content
          )
        )
      )
    );
  };

  return Message;
}(Component);

Message.propTypes = process.env.NODE_ENV !== "production" ? {
  type: PropTypes.oneOf(['text', 'typing']).isRequired,
  content: PropTypes.object,
  isInbound: PropTypes.bool.isRequired
} : {};

export default Message;