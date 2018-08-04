function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';

import Animatable from './../Animatable';
import GetStartedButton from './controls/GetStartedButton';
import ReplyButton from './controls/ReplyButton';
import TextInput from './controls/TextInput';

var ActionBar = function (_Component) {
  _inherits(ActionBar, _Component);

  function ActionBar() {
    _classCallCheck(this, ActionBar);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  ActionBar.prototype.render = function render() {
    var _this2 = this;

    var items = function () {
      return _this2.props.actions && _this2.props.actions.map(function (action, i) {
        var li = function () {
          switch (action.type) {
            case 'get-started':
              return React.createElement(GetStartedButton, action);

            case 'quick-reply':
              return React.createElement(ReplyButton, action);

            case 'text-input':
              return React.createElement(TextInput, action);
          }
        }();
        return React.createElement(
          Animatable,
          { classNames: 'ActionBar', key: i },
          React.createElement(
            'li',
            { className: 'Action' },
            li
          )
        );
      });
    }();
    return React.createElement(
      TransitionGroup,
      { component: 'ul', className: 'ActionBar' },
      items
    );
  };

  return ActionBar;
}(Component);

ActionBar.propTypes = process.env.NODE_ENV !== "production" ? {
  actions: PropTypes.arrayOf(PropTypes.object)
} : {};

export default ActionBar;