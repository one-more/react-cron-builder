"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = type;
function type(_ref) {
  var wrapper = _ref.wrapper,
      markup = _ref.markup,
      arg1 = _ref.arg1,
      sig = _ref.sig;

  var actual = wrapper.type();

  this.assert(actual === arg1, function () {
    return "expected " + sig + " to be of type #{exp}, but it is of type #{act} " + markup();
  }, function () {
    return "expected " + sig + " to not be of type #{exp}, but it is of type #{act} " + markup();
  }, arg1, actual);
}