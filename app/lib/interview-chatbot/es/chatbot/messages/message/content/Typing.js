function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

var Typing = function (_Component) {
  _inherits(Typing, _Component);

  function Typing() {
    _classCallCheck(this, Typing);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Typing.prototype.render = function render() {
    return React.createElement(
      'div',
      { className: 'Typing' },
      React.createElement('span', null),
      React.createElement('span', null),
      React.createElement('span', null)
    );
  };

  return Typing;
}(Component);

export default Typing;