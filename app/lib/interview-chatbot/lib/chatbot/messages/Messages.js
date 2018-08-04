'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactScroll = require('react-scroll');

var _reactScroll2 = _interopRequireDefault(_reactScroll);

var _reactTransitionGroup = require('react-transition-group');

var _Animatable = require('./../Animatable');

var _Animatable2 = _interopRequireDefault(_Animatable);

var _Message = require('./message/Message');

var _Message2 = _interopRequireDefault(_Message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Element = _reactScroll2.default.Element;
var Scroller = _reactScroll2.default.scroller;

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
      return _react2.default.createElement(
        _Animatable2.default,
        { classNames: 'Messages', key: i },
        _react2.default.createElement(_Message2.default, message)
      );
    });
    var lastMessage = _react2.default.createElement(Element, { name: 'LastMessage' });
    return _react2.default.createElement(
      _reactTransitionGroup.TransitionGroup,
      { component: 'ul', className: 'Messages', id: 'Messages' },
      messages,
      lastMessage
    );
  };

  return Messages;
}(_react.Component);

Messages.defaultProps = {
  messages: []
};

Messages.propTypes = process.env.NODE_ENV !== "production" ? {
  messages: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired
} : {};

exports.default = Messages;
module.exports = exports['default'];