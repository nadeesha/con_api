/* jshint indent: false */

'use strict';

var db = require('./db.js').db;
var utils = require('./utils.js');

var createEventCategory = function (eventCategory) {

    var values = [
        eventCategory.name
    ];

    utils.parseValues(values);

    var query = 'INSERT INTO tbl_event_category (name) VALUES (' + values.toString() + ')';

    db.query(query);

    return;
}

var updateEventCategory = function (eventCategory, id) {
    var query = 'UPDATE tbl_event_category SET ' +
        'name = ' + utils.parseValue(eventCategory.name) + ', ' +
        'WHERE  id = ' + utils.parseValue(id);

    db.query(query);

    return;
}

var getEventCategoryByEventCategoryId = function (eventCategoryId) {
    var result = db.query('SELECT * ' +
        'FROM tbl_event_category WHERE id = ' + eventCategoryId);
    return result;
}

var getEventCategoryWithEvents = function (eventCategoryId) {
    var result = db.query('SELECT ' +
        'tec.id AS eventCategoryId,' +
        'tec.name AS eventCategoryName,' +
        'te.id AS eventId,' +
        'TRIM(te.title) AS eventTitle,' +
        'TRIM(te.description) AS eventDescription,' +
        'TRIM(te.venue) AS venue,' +
        'DATE_FORMAT(te.fromDateTime, \'%Y-%m-%d %h:%i %p\') AS eventFromDateTime,' +
        'DATE_FORMAT(te.toDateTime, \'%Y-%m-%d %h:%i %p\') AS eventToDateTime,' +
        'te.isCrossTrack AS eventIsCrossTrack ' +
        'FROM tbl_event_category tec JOIN tbl_event te ON tec.id=te.eventCategoryId WHERE tec.id = ' + eventCategoryId);

    return result;
}