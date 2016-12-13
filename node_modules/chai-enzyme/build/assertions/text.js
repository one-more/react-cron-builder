'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = text;
function text(_ref) {
  var wrapper = _ref.wrapper,
      markup = _ref.markup,
      flag = _ref.flag,
      arg1 = _ref.arg1,
      sig = _ref.sig;

  var actual = wrapper.text();

  if (undefined !== arg1) {
    if (flag(this, 'contains')) {
      this.assert(actual.indexOf(String(arg1)) > -1, function () {
        return 'expected ' + sig + ' to contain text #{exp}, but it has #{act} ' + markup();
      }, function () {
        return 'expected ' + sig + ' not to contain text #{exp}, but it has #{act} ' + markup();
      }, arg1, actual);
    } else {
      this.assert(actual === String(arg1), function () {
        return 'expected ' + sig + ' to have text #{exp}, but it has #{act} ' + markup();
      }, function () {
        return 'expected ' + sig + ' not to have text #{exp}, but it has #{act} ' + markup();
      }, arg1, actual);
    }
  }

  flag(this, 'object', actual);
}