module.exports = function sortObject (obj, comparator) {
	// Arrays
	if ( Array.isArray(obj) ) {
		const result = []
		for ( let i = 0; i < obj.length; ++i ) {
			// Fetch
			let value = obj[i]

			// Recurse if object or array
			if ( value != null && typeof value === 'object' ) {
				value = sortObject(value, comparator)
			}

			// Push
			result.push(value)
		}
		return result
	}

	// Objects
	else {
		const result = {}
		const sortedKeys = Object.keys(obj).sort(comparator)
		for ( let i = 0; i < sortedKeys.length; ++i ) {
			// Fetch
			const key = sortedKeys[i]
			let value = obj[key]

			// Recurse if object or array
			if ( value != null && typeof value === 'object' ) {
				value = sortObject(value, comparator)
			}

			// Push
			result[key] = value
		}
		return result
	}
}
