'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactTransitionGroup = require('react-transition-group');

var _Animatable = require('./../Animatable');

var _Animatable2 = _interopRequireDefault(_Animatable);

var _GetStartedButton = require('./controls/GetStartedButton');

var _GetStartedButton2 = _interopRequireDefault(_GetStartedButton);

var _ReplyButton = require('./controls/ReplyButton');

var _ReplyButton2 = _interopRequireDefault(_ReplyButton);

var _TextInput = require('./controls/TextInput');

var _TextInput2 = _interopRequireDefault(_TextInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
              return _react2.default.createElement(_GetStartedButton2.default, action);

            case 'quick-reply':
              return _react2.default.createElement(_ReplyButton2.default, action);

            case 'text-input':
              return _react2.default.createElement(_TextInput2.default, action);
          }
        }();
        return _react2.default.createElement(
          _Animatable2.default,
          { classNames: 'ActionBar', key: i },
          _react2.default.createElement(
            'li',
            { className: 'Action' },
            li
          )
        );
      });
    }();
    return _react2.default.createElement(
      _reactTransitionGroup.TransitionGroup,
      { component: 'ul', className: 'ActionBar' },
      items
    );
  };

  return ActionBar;
}(_react.Component);

ActionBar.propTypes = process.env.NODE_ENV !== "production" ? {
  actions: _propTypes2.default.arrayOf(_propTypes2.default.object)
} : {};

exports.default = ActionBar;
module.exports = exports['default'];