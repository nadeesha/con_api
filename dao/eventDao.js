/* jshint indent: false */

'use strict';

var db = require('./db.js').db;
var utils = require('./utils.js');

var createEvent = function (event) {

    var values = [
        event.title,
        event.description,
        event.venue,
        event.fromDateTime,
        event.toDateTime,
        event.isCrossTrack,
        event.eventTypeId,
        event.trackId,
        event.agendaId,
        event.conferenceId,
        event.eventCategoryId
    ];

    utils.parseValues(values);

    var query = 'INSERT INTO tbl_event (title, description, venue, ' +
        'fromDateTime, toDateTime, isCrossTrack, ' +
        'eventTypeId, trackId, agendaId, conferenceId, eventCategoryId) VALUES (' + values.toString() + ')';

    db.query(query);

    return;
}

var updateEvent = function (event, id) {
    var query = 'UPDATE tbl_event SET ' +
        'title = ' + utils.parseValue(event.title) + ', ' +
        'description = ' + utils.parseValue(event.description) + ', ' +
        'venue = ' + utils.parseValue(event.venue) + ', ' +
        'fromDateTime = ' + utils.parseValue(event.fromDateTime) + ', ' +
        'toDateTime = ' + utils.parseValue(event.toDateTime) + ', ' +
        'isCrossTrack = ' + utils.parseValue(event.isCrossTrack) + ', ' +
        'eventTypeId = ' + utils.parseValue(event.eventTypeId) + ', ' +
        'trackId = ' + utils.parseValue(event.trackId) + ', ' +
        'agendaId = ' + utils.parseValue(event.agendaId) + ', ' +
        'conferenceId = ' + utils.parseValue(event.conferenceId) + ', ' +
        'eventCategoryId = ' + utils.parseValue(event.eventCategoryId) + ' ' +
        'WHERE  id = ' + utils.parseValue(id);

    db.query(query);

    return;
}

var deleteEvent = function (eventId) {
    db.query('DELETE FROM tbl_event WHERE id = ' + utils.parseValue(eventId));

    return;
}

var getEventByEventId = function (eventId) {
    var result = db.query('SELECT ' +
        'te.id AS id,' +
        'CONVERT(te.title USING ascii) AS title,' +
        'CONVERT(te.description USING ascii) AS description,' +
        'CONVERT(te.venue USING ascii) AS venue,' +
        'DATE_FORMAT(te.fromDateTime, \'%Y-%m-%d %h:%i %p\') AS fromDateTime,' +
        'DATE_FORMAT(te.toDateTime, \'%Y-%m-%d %h:%i %p\') AS toDateTime,' +
        'te.isCrossTrack AS isCrossTrack ' +
        'FROM tbl_event te WHERE id = ' + utils.parseValue(eventId));

    return result;
}

var getAllEventByAgenda = function (agendId) {
    var result = db.query('SELECT ' +
        'te.id AS id,' +
        'CONVERT(te.title USING ascii) AS title,' +
        'CONVERT(te.description USING ascii) AS description,' +
        'CONVERT(te.venue USING ascii) AS venue,' +
        'te.eventTypeId AS eventTypeId,' +
        'DATE_FORMAT(te.fromDateTime, \'%Y-%m-%d %H:%i:%s\') AS fromDateTime,' +
        'DATE_FORMAT(te.toDateTime, \'%Y-%m-%d %H:%i:%s\') AS toDateTime,' +
        'te.isCrossTrack AS isCrossTrack ' +
        'FROM tbl_event te JOIN tbl_track tt ON te.trackId = tt.id ' +
        'WHERE tt.agendaId = ' + utils.parseValue(agendId) + ' ' +
        'ORDER BY te.fromDateTime' );

    return result;
}

var getEventByEventIdWithSpekers = function (eventId) {
    var result = db.query('SELECT ' +
        'te.id AS id,' +
        'CONVERT(te.title USING ascii) AS eventTitle,' +
        'CONVERT(te.description USING ascii) AS eventDescription,' +
        'CONVERT(te.venue USING ascii) AS eventVenue,' +
        'DATE_FORMAT(te.fromDateTime, \'%Y-%m-%d %h:%i %p\') AS eventFromDateTime,' +
        'DATE_FORMAT(te.toDateTime, \'%Y-%m-%d %h:%i %p\') AS eventToDateTime,' +
        'te.isCrossTrack AS eventIsCrossTrack,' +
        'ts.id AS speakerId,' +
        'TRIM(ts.name) AS speakerName,' +
        'TRIM(ts.designation) AS speakerDesignation,' +
        'TRIM(ts.bio) AS speakerBio,' +
        'TRIM(ts.bioMobile) AS speakerBioMobile,' +
        'TRIM(ts.photo) AS speakerPhoto ' +
        'FROM tbl_event te JOIN tbl_speaker_event tse ON te.id = tse.eventId ' +
        'JOIN tbl_speaker ts ON tse.speakerId = ts.id WHERE te.id = ' + utils.parseValue(eventId));
    return result;
}

var getAllEventByTrack = function (agendId, trackId) {
    var result = db.query('SELECT ' +
        'te.id AS id,' +
        'CONVERT(te.title USING ascii)  AS title,' +
        'CONVERT(te.description USING ascii) AS description,' +
        'CONVERT(te.venue USING ascii) AS venue,' +
        'te.eventTypeId AS eventTypeId,' +
        'te.eventCategoryId AS eventCategoryId,' +
        'DATE_FORMAT(te.fromDateTime, \'%Y-%m-%d %H:%i:%s\') AS fromDateTime,' +
        'DATE_FORMAT(te.toDateTime, \'%Y-%m-%d %H:%i:%s\') AS toDateTime,' +
        'te.isCrossTrack AS isCrossTrack ' +
        'FROM tbl_event te JOIN tbl_track tt ON te.trackId = tt.id ' +
        'WHERE trackId = ' + utils.parseValue(trackId) + ' AND tt.agendaId = ' + utils.parseValue(agendId) + ' ' +
        'ORDER BY te.fromDateTime' );

    return result;
}

var getAllEvents = function (trackId) {
    var result = db.query('SELECT ' +
        'te.id AS id,' +
        'CONVERT(te.title USING ascii) AS title,' +
        'CONVERT(te.description USING ascii) AS description,' +
        'CONVERT(te.venue USING ascii) AS venue,' +
        'te.eventTypeId AS eventTypeId,' +
        'te.eventCategoryId AS eventCategoryId,' +
        'DATE_FORMAT(te.fromDateTime, \'%Y-%m-%d %H:%i:%s\') AS fromDateTime,' +
        'DATE_FORMAT(te.toDateTime, \'%Y-%m-%d %H:%i:%s\') AS toDateTime,' +
        'te.isCrossTrack AS isCrossTrack ' +
        'FROM tbl_event te');
    return result;
}

var getAllEventByEventTypeWithSpeakers = function (eventTypeId) {
    var result = db.query('SELECT ' +
        'te.id AS eventId,' +
        'CONVERT(te.title USING ascii) AS eventTitle,' +
        'CONVERT(te.description USING ascii) AS eventDescription,' +
        'CONVERT(te.venue USING ascii) AS eventVenue,' +
        'DATE_FORMAT(te.fromDateTime, \'%Y-%m-%d %h:%i %p\') AS eventFromDateTime,' +
        'DATE_FORMAT(te.toDateTime, \'%Y-%m-%d %h:%i %p\') AS eventToDateTime,' +
        'te.isCrossTrack AS eventIsCrossTrack,' +
        'ts.id AS speakerId,' +
        'TRIM(ts.name) AS speakerName,' +
        'TRIM(ts.designation) AS speakerDesignation,' +
        'TRIM(ts.bio) AS speakerBio,' +
        'TRIM(ts.bioMobile) AS speakerBioMobile,' +
        'TRIM(ts.photo) AS speakerPhoto ' +
        'FROM tbl_event te JOIN tbl_speaker_event tse ON te.id = tse.eventId ' +
        'JOIN tbl_speaker ts ON tse.speakerId = ts.id WHERE te.eventTypeId = ' + utils.parseValue(eventTypeId));
    return result;
}

var getAllEventByTrackWithEventTypesSpeakers = function (trackId) {
    var result = db.query('SELECT ' +
        'te.id AS eventId,' +
        'CONVERT(te.title USING ascii) AS eventTitle,' +
        'CONVERT(te.description USING ascii) AS eventDescription,' +
        'CONVERT(te.venue USING ascii) AS eventVenue,' +
        'DATE_FORMAT(te.fromDateTime, \'%Y-%m-%d %h:%i %p\') AS eventFromDateTime,' +
        'DATE_FORMAT(te.toDateTime, \'%Y-%m-%d %h:%i %p\') AS eventToDateTime,' +
        'te.isCrossTrack AS eventIsCrossTrack,' +
        'tet.id AS eventTypeId,' +
        'TRIM(tet.name) AS eventTypeName,' +
        'ts.id AS speakerId,' +
        'TRIM(ts.name) AS speakerName,' +
        'TRIM(ts.designation) AS speakerDesignation,' +
        'TRIM(ts.bio) AS speakerBio,' +
        'TRIM(ts.bioMobile) AS speakerBioMobile,' +
        'TRIM(ts.photo) AS speakerPhoto ' +
        'FROM tbl_event te JOIN tbl_event_type tet ON te.eventTypeId = tet.id ' +
        'JOIN tbl_speaker_event tse ON te.id = tse.eventId ' +
        'JOIN tbl_speaker ts ON tse.speakerId = ts.id WHERE te.trackId = ' + utils.parseValue(trackId));
    return result;
}

var getAllEventBySpeakerWithEventType = function (speakerId) {
    var result = db.query('SELECT ' +
        'te.id AS eventId,' +
        'CONVERT(te.title USING ascii) AS eventTitle,' +
        'CONVERT(te.description USING ascii) AS eventDescription,' +
        'CONVERT(te.venue USING ascii) AS eventVenue,' +
        'DATE_FORMAT(te.fromDateTime, \'%Y-%m-%d %h:%i %p\') AS eventFromDateTime,' +
        'DATE_FORMAT(te.toDateTime, \'%Y-%m-%d %h:%i %p\') AS eventToDateTime,' +
        'te.isCrossTrack AS eventIsCrossTrack,' +
        'tet.id AS eventTypeId,' +
        'TRIM(tet.name) AS eventTypeName,' +
        'ts.id AS speakerId,' +
        'TRIM(ts.name) AS speakerName,' +
        'TRIM(ts.designation) AS speakerDesignation,' +
        'TRIM(ts.bio) AS speakerBio,' +
        'TRIM(ts.bioMobile) AS speakerBioMobile,' +
        'TRIM(ts.photo) AS speakerPhoto ' +
        'FROM tbl_event te JOIN tbl_event_type tet ON te.eventTypeId = tet.id ' +
        'JOIN tbl_speaker_event tse ON te.id = tse.eventId ' +
        'JOIN tbl_speaker ts ON tse.speakerId = ts.id WHERE ts.id = ' + utils.parseValue(speakerId));
    return result;
}
