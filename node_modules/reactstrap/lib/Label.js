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

var colSizes = ['xs', 'sm', 'md', 'lg', 'xl'];

var stringOrNumberProp = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);

var columnProps = PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.shape({
  size: stringOrNumberProp,
  push: stringOrNumberProp,
  pull: stringOrNumberProp,
  offset: stringOrNumberProp
})]);

var propTypes = {
  children: PropTypes.node,
  hidden: PropTypes.bool,
  check: PropTypes.bool,
  inline: PropTypes.bool,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  for: PropTypes.string,
  tag: PropTypes.string,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  xs: columnProps,
  sm: columnProps,
  md: columnProps,
  lg: columnProps,
  xl: columnProps
};

var defaultProps = {
  tag: 'label'
};

var Label = function Label(props) {
  var className = props.className,
      cssModule = props.cssModule,
      hidden = props.hidden,
      Tag = props.tag,
      check = props.check,
      inline = props.inline,
      disabled = props.disabled,
      size = props.size,
      htmlFor = props.for,
      attributes = _objectWithoutProperties(props, ['className', 'cssModule', 'hidden', 'tag', 'check', 'inline', 'disabled', 'size', 'for']);

  var colClasses = [];

  colSizes.forEach(function (colSize) {
    var columnProp = props[colSize];
    delete attributes[colSize];

    if (columnProp && columnProp.size) {
      var _classNames;

      colClasses.push((0, _utils.mapToCssModules)((0, _classnames2.default)((_classNames = {}, _defineProperty(_classNames, 'col-' + colSize + '-' + columnProp.size, columnProp.size), _defineProperty(_classNames, 'push-' + colSize + '-' + columnProp.push, columnProp.push), _defineProperty(_classNames, 'pull-' + colSize + '-' + columnProp.pull, columnProp.pull), _defineProperty(_classNames, 'offset-' + colSize + '-' + columnProp.offset, columnProp.offset), _classNames))), cssModule);
    } else if (columnProp) {
      colClasses.push('col-' + colSize + '-' + columnProp);
    }
  });

  var classes = (0, _utils.mapToCssModules)((0, _classnames2.default)(className, hidden ? 'sr-only' : false, check ? 'form-check-' + (inline ? 'inline' : 'label') : false, check && inline && disabled ? 'disabled' : false, size ? 'col-form-label-' + size : false, colClasses, colClasses.length ? 'col-form-label' : false), cssModule);

  return _react2.default.createElement(Tag, _extends({ htmlFor: htmlFor }, attributes, { className: classes }));
};

Label.propTypes = propTypes;
Label.defaultProps = defaultProps;

exports.default = Label;