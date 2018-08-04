var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import { CSSTransition } from 'react-transition-group';

var Animatable = function Animatable(_ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, ['children']);

  return React.createElement(
    CSSTransition,
    _extends({}, props, {
      timeout: { enter: 500, exit: 300 } }),
    children
  );
};

export default Animatable;