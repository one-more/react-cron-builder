'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = html;
function html(_ref) {
  var wrapper = _ref.wrapper,
      markup = _ref.markup,
      flag = _ref.flag,
      arg1 = _ref.arg1,
      sig = _ref.sig;

  var actual = wrapper.html();

  if (undefined !== arg1) {
    if (flag(this, 'contains')) {
      this.assert(actual.includes(String(arg1)), function () {
        return 'expected ' + sig + ' to contain html #{exp}, but it has #{act} ' + markup();
      }, function () {
        return 'expected ' + sig + ' not to contain html #{exp}, but it has #{act} ' + markup();
      }, arg1, actual);
    } else {
      this.assert(actual === arg1, function () {
        return 'expected ' + sig + ' to be #{exp}, but it was #{act} ' + markup();
      }, function () {
        return 'expected ' + sig + ' not to be #{exp}, but it was #{act} ' + markup();
      }, arg1, actual);
    }
  }

  flag(this, 'object', actual);
}