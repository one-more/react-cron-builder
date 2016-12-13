'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = checked;
function checked(_ref) {
  var wrapper = _ref.wrapper,
      markup = _ref.markup,
      sig = _ref.sig;

  this.assert(wrapper.isChecked(), function () {
    return 'expected ' + sig + ' to be checked ' + markup();
  }, function () {
    return 'expected ' + sig + ' not to be checked ' + markup();
  });
}