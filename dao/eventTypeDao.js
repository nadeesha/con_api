/* jshint indent: false */

'use strict';

var db = require('./db.js').db;
var utils = require('./utils.js');

var createEventType = function (eventType) {

    var values = [
        eventType.name,
        1
    ];

    utils.parseValues(values);

    db.query('INSERT INTO tbl_event_type (name, status) VALUES (' + values.toString() + ')');

    return;
}

var updateEventType = function (eventType, id) {

    db.query('UPDATE tbl_event_type SET ' +
        'name = ' + utils.parseValue(eventType.name) + ', ' +
        'status = ' + utils.parseValue(eventType.status) || 1 + ' ' +
        'WHERE id = ' + utils.parseValue(id));

    return;
}

var getEventTypeByEventTypeId = function (eventTypeId) {
    var result = db.query('SELECT * FROM tbl_event_type WHERE id = '+ utils.parseValue(eventTypeId));

    return result;
}

var getAllEventType = function () {
    var result = db.query('SELECT * FROM tbl_event_type');

    return result;
}

var getAllActiveEventType = function () {
    var result = db.query('SELECT * FROM tbl_event_type WHERE status = 1');

    return result;
}