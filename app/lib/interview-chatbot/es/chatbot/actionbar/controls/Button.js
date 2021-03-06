function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    return React.createElement(
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
}(Component);

Button.propTypes = process.env.NODE_ENV !== "production" ? {
  title: PropTypes.string.isRequired,
  callback: PropTypes.func,
  onAction: PropTypes.func.isRequired
} : {};

export default Button;