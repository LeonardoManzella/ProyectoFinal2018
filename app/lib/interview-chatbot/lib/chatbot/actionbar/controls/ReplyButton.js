'use strict';

exports.__esModule = true;

var _Button2 = require('./Button');

var _Button3 = _interopRequireDefault(_Button2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReplyButton = function (_Button) {
  _inherits(ReplyButton, _Button);

  function ReplyButton(props) {
    _classCallCheck(this, ReplyButton);

    var _this = _possibleConstructorReturn(this, _Button.call(this, props));

    if (props.title && props.title == 'Siguiente pregunta') {
      _this.buttonClassName = 'ReplyButton next-question-button';
      return _this;
    } else {
      _this.buttonClassName = 'ReplyButton';
      return _this;
    }

  }

  return ReplyButton;
}(_Button3.default);

exports.default = ReplyButton;
module.exports = exports['default'];