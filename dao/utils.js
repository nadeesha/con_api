/* jshint indent: false */

'use strict';

// takes an array of SQL values and parses them for safe CRUD
var parseValues = function(arr) {
	if (arr instanceof Array) {
		arr.forEach(function(element, index, array) {
			array[index] = parseValue(element);
		});
	} else {
		var log = new Log();
		log.warn('Non-array passed as SQL values');
	}
};

// takes a value and parses it for safe CRUD
var parseValue = function(value) {
	if (typeof value === 'string' || value instanceof Date) {
		return '"' + value + '"';
	} else {
		return value;
	}
};