'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = disabled;
function disabled(_ref) {
  var wrapper = _ref.wrapper,
      markup = _ref.markup,
      sig = _ref.sig;

  this.assert(wrapper.isDisabled(), function () {
    return 'expected ' + sig + ' to be disabled ' + markup();
  }, function () {
    return 'expected ' + sig + ' not to be disabled ' + markup();
  });
}