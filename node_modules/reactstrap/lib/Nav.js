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
  tabs: PropTypes.bool,
  pills: PropTypes.bool,
  vertical: PropTypes.bool,
  navbar: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  className: PropTypes.string,
  cssModule: PropTypes.object
};

var defaultProps = {
  tag: 'ul'
};

var Nav = function Nav(props) {
  var className = props.className,
      cssModule = props.cssModule,
      tabs = props.tabs,
      pills = props.pills,
      vertical = props.vertical,
      navbar = props.navbar,
      Tag = props.tag,
      attributes = _objectWithoutProperties(props, ['className', 'cssModule', 'tabs', 'pills', 'vertical', 'navbar', 'tag']);

  var classes = (0, _utils.mapToCssModules)((0, _classnames2.default)(className, navbar ? 'navbar-nav' : 'nav', {
    'nav-tabs': tabs,
    'nav-pills': pills,
    'flex-column': vertical
  }), cssModule);

  return _react2.default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

Nav.propTypes = propTypes;
Nav.defaultProps = defaultProps;

exports.default = Nav;