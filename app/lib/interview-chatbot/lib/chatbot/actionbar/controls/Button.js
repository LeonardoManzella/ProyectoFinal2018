'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = function (_Component) {
  _inherits(Button, _Component);

  function Button(props) {
    _classCallCheck(this, Button);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this._handleClick = _this._handleClick.bind(_this);
    _this.buttonClassName = '';
    return _this;
  }

  Button.prototype.render = function render() {
    return _react2.default.createElement(
      'button',
      { className: this.buttonClassName, onClick: this._handleClick },
      this.props.title
    );
  };

  Button.prototype._handleClick = function _handleClick(e) {
    e.preventDefault();

    this.props.onAction(this.props.title, this.props.callback);
  };

  return Button;
}(_react.Component);

Button.propTypes = process.env.NODE_ENV !== "production" ? {
  title: _propTypes2.default.string.isRequired,
  callback: _propTypes2.default.func,
  onAction: _propTypes2.default.func.isRequired
} : {};

exports.default = Button;
module.exports = exports['default'];