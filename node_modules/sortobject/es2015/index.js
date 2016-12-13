'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

module.exports = function sortObject(obj, comparator) {
	// Arrays
	if (Array.isArray(obj)) {
		var result = [];
		for (var i = 0; i < obj.length; ++i) {
			// Fetch
			var value = obj[i];

			// Recurse if object or array
			if (value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
				value = sortObject(value, comparator);
			}

			// Push
			result.push(value);
		}
		return result;
	}

	// Objects
	else {
			var _result = {};
			var sortedKeys = Object.keys(obj).sort(comparator);
			for (var _i = 0; _i < sortedKeys.length; ++_i) {
				// Fetch
				var key = sortedKeys[_i];
				var _value = obj[key];

				// Recurse if object or array
				if (_value != null && (typeof _value === 'undefined' ? 'undefined' : _typeof(_value)) === 'object') {
					_value = sortObject(_value, comparator);
				}

				// Push
				_result[key] = _value;
			}
			return _result;
		}
};