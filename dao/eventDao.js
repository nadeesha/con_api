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
        event.conferenceId
    ];

    utils.parseValues(values);

    var query = 'INSERT INTO tbl_event (title, description, venue, ' + 
        'fromDateTime, toDateTime, isCrossTrack, ' +
        'eventTypeId, trackId, agendaId, conferenceId) VALUES (' + values.toString() + ')';

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
        'conferenceId = ' + utils.parseValue(event.conferenceId) + ' ' +
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
        'TRIM(te.title)  AS title,' +
        'TRIM(te.description) AS description,' +
        'TRIM(te.venue) AS venue,' +
        'DATE_FORMAT(te.fromDateTime, \'%Y-%m-%d %h:%i %p\') AS fromDateTime,' +
        'DATE_FORMAT(te.toDateTime, \'%Y-%m-%d %h:%i %p\') AS toDateTime,' +
        'te.isCrossTrack AS isCrossTrack ' +
        'FROM tbl_event te WHERE id = ' + utils.parseValue(eventId));

    return result;
}

var getEventByEventIdWithSpekers = function (eventId) {
    var result = db.query('SELECT ' +
        'te.id AS id,' +
        'TRIM(te.title)  AS eventTitle,' +
        'TRIM(te.description) AS eventDescription,' +
        'TRIM(te.venue) AS eventVenue,' +
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
        'TRIM(te.title)  AS title,' +
        'TRIM(te.description) AS description,' +
        'TRIM(te.venue) AS venue,' +
        'te.eventTypeId AS eventTypeId,' +
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
        'TRIM(te.title)  AS title,' +
        'TRIM(te.description) AS description,' +
        'TRIM(te.venue) AS venue,' +
        'te.eventTypeId AS eventTypeId,' +
        'DATE_FORMAT(te.fromDateTime, \'%Y-%m-%d %H:%i:%s\') AS fromDateTime,' +
        'DATE_FORMAT(te.toDateTime, \'%Y-%m-%d %H:%i:%s\') AS toDateTime,' +
        'te.isCrossTrack AS isCrossTrack ' +
        'FROM tbl_event te');
    return result;
}

var getAllEventByEventTypeWithSpeakers = function (eventTypeId) {
    var result = db.query('SELECT ' +
        'te.id AS eventId,' +
        'TRIM(te.title)  AS eventTitle,' +
        'TRIM(te.description) AS eventDescription,' +
        'TRIM(te.venue) AS eventVenue,' +
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
        'TRIM(te.title)  AS eventTitle,' +
        'TRIM(te.description) AS eventDescription,' +
        'TRIM(te.venue) AS eventVenue,' +
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
        'TRIM(te.title)  AS eventTitle,' +
        'TRIM(te.description) AS eventDescription,' +
        'TRIM(te.venue) AS eventVenue,' +
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