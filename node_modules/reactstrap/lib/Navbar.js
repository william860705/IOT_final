'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var PropTypes = _react2.default.PropTypes;

var propTypes = {
  light: PropTypes.bool,
  inverse: PropTypes.bool,
  full: PropTypes.bool,
  fixed: PropTypes.string,
  sticky: PropTypes.string,
  color: PropTypes.string,
  role: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  className: PropTypes.string,
  cssModule: PropTypes.object,
  toggleable: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};

var defaultProps = {
  tag: 'nav',
  role: 'navigation',
  toggleable: false
};

var getToggleableClass = function getToggleableClass(toggleable) {
  if (toggleable === false) {
    return false;
  } else if (toggleable === true || toggleable === 'xs') {
    return 'navbar-toggleable';
  }

  return 'navbar-toggleable-' + toggleable;
};

var Navbar = function Navbar(props) {
  var _classNames;

  var toggleable = props.toggleable,
      className = props.className,
      cssModule = props.cssModule,
      light = props.light,
      inverse = props.inverse,
      full = props.full,
      fixed = props.fixed,
      sticky = props.sticky,
      color = props.color,
      Tag = props.tag,
      attributes = _objectWithoutProperties(props, ['toggleable', 'className', 'cssModule', 'light', 'inverse', 'full', 'fixed', 'sticky', 'color', 'tag']);

  var classes = (0, _utils.mapToCssModules)((0, _classnames2.default)(className, 'navbar', getToggleableClass(toggleable), (_classNames = {
    'navbar-light': light,
    'navbar-inverse': inverse
  }, _defineProperty(_classNames, 'bg-' + color, color), _defineProperty(_classNames, 'navbar-full', full), _defineProperty(_classNames, 'fixed-' + fixed, fixed), _defineProperty(_classNames, 'sticky-' + sticky, sticky), _classNames)), cssModule);

  return _react2.default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

exports.default = Navbar;