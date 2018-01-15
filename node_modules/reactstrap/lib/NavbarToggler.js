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

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var PropTypes = _react2.default.PropTypes;

var propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  type: PropTypes.string,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  children: PropTypes.node,
  right: PropTypes.bool,
  left: PropTypes.bool
};

var defaultProps = {
  tag: 'button',
  type: 'button'
};

var navbarToggleIcon = _react2.default.createElement('span', { className: 'navbar-toggler-icon' });

var NavbarToggler = function NavbarToggler(props) {
  var className = props.className,
      cssModule = props.cssModule,
      children = props.children,
      right = props.right,
      left = props.left,
      Tag = props.tag,
      attributes = _objectWithoutProperties(props, ['className', 'cssModule', 'children', 'right', 'left', 'tag']);

  var classes = (0, _utils.mapToCssModules)((0, _classnames2.default)(className, 'navbar-toggler', right && 'navbar-toggler-right', left && 'navbar-toggler-left'), cssModule);

  return _react2.default.createElement(
    Tag,
    _extends({}, attributes, { className: classes }),
    children || navbarToggleIcon
  );
};

NavbarToggler.propTypes = propTypes;
NavbarToggler.defaultProps = defaultProps;

exports.default = NavbarToggler;