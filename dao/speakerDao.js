/* jshint indent: false */

'use strict';

var db = require('./db.js').db;
var utils = require('./utils.js');

var createSpeaker = function(speaker) {

    var values = [
        speaker.name,
        speaker.designation,
        speaker.bio,
        speaker.bioMobile,
        speaker.photo,
        1
    ];

    utils.parseValues(values);

    db.query('INSERT INTO tbl_speaker (name, designation, bio, bioMobile, photo, status) VALUES (' + values.toString() + ')');

    return;
}

var updateSpeaker = function(speaker, id) {

    db.query('UPDATE tbl_speaker SET ' +
        'name = ' + utils.parseValue(speaker.name) + ', ' +
        'designation = ' + utils.parseValue(speaker.designation) + ', ' +
        'bio = ' + utils.parseValue(speaker.bio) + ', ' +
        'bioMobile = ' + utils.parseValue(speaker.bioMobile) + ', ' +
        'photo = ' + utils.parseValue(speaker.photo) + ', ' +
        'status = ' + utils.parseValue(speaker.status) + ' ' +
        'WHERE id = ' + utils.parseValue(id));

    return;
}

var getSpeakerBySpeakerId = function(speakerId) {
    var result = db.query('SELECT id,name,designation,CONVERT(bio USING ascii) AS bio,CONVERT(bioMobile USING ascii) AS bioMobile,photo,status FROM tbl_speaker WHERE id = ' + utils.parseValue(speakerId));

    return result;
}

var getAllSpeakers = function() {
    var result = db.query('SELECT id,name,designation,CONVERT(bio USING ascii) AS bio,CONVERT(bioMobile USING ascii) AS bioMobile,photo,status FROM tbl_speaker');

    return result;
}

var getAllActiveSpeakers = function() {
    var result = db.query('SELECT id,name,designation,CONVERT(bio USING ascii) AS bio,CONVERT(bioMobile USING ascii) AS bioMobile,photo,status FROM tbl_speaker WHERE status = 1');

    return result;
}

var getConferenceSpeakerWithEvent = function(speakerId, conferenceId) {
    var result = db.query('SELECT ' +
        'TRIM(ts.id) AS speakerId,' +
        'TRIM(ts.name) AS speakerName,' +
        'TRIM(ts.designation) AS speakerDesignation,' +
        'CONVERT(ts.bio USING ascii) AS speakerBio,' +
        'CONVERT(ts.bioMobile USING ascii) AS speakerBioMobile,' +
        'TRIM(ts.photo) AS speakerPhoto,' +
        'TRIM(te.id) AS eventId,' +
        'TRIM(te.title) AS eventTitle,' +
        'TRIM(te.description) AS eventtDescription,' +
        'TRIM(te.venue) AS eventVenue,' +
        'DATE_FORMAT(te.fromDateTime, \'%Y-%m-%d %h:%i %p\') AS eventFromDateTime,' +
        'DATE_FORMAT(te.toDateTime, \'%Y-%m-%d %h:%i %p\') AS eventToDateTime,' +
        'TRIM(te.isCrossTrack) AS eventIsCrossTrack,' +
        'TRIM(te.trackId) AS trackId,' +
        'TRIM(te.agendaId) AS agendaId,' +
        'TRIM(te.conferenceId) AS conferenceId,' +
        'TRIM(tet.id) AS eventTypeId,' +
        'TRIM(tet.name) AS eventTypeName ' +
        'FROM tbl_speaker ts JOIN tbl_speaker_event tse ON ts.id = tse.speakerId ' +
        'JOIN tbl_event te ON tse.eventId  = te.id JOIN tbl_event_type tet ON te.eventTypeId = tet.id ' +
        'WHERE ts.id = ' + utils.parseValue(speakerId) + ' AND tse.conferenceId = ' + utils.parseValue(conferenceId));

    return result;
}



var getAllConferenceSpeakersWithEvent = function(conferenceId) {
    var result = db.query('SELECT ' +
        'TRIM(ts.id) AS speakerId,' +
        'TRIM(ts.name) AS speakerName,' +
        'TRIM(ts.designation) AS speakerDesignation,' +
        'CONVERT(ts.bio USING ascii) AS speakerBio,' +
        'CONVERT(ts.bioMobile USING ascii) AS speakerBioMobile,' +
        'TRIM(ts.photo) AS speakerPhoto,' +
        'TRIM(te.id) AS eventId,' +
        'TRIM(te.title) AS eventTitle,' +
        'TRIM(te.description) AS eventtDescription,' +
        'TRIM(te.venue) AS eventVenue,' +
        'DATE_FORMAT(te.fromDateTime, \'%Y-%m-%d %h:%i %p\') AS eventFromDateTime,' +
        'DATE_FORMAT(te.toDateTime, \'%Y-%m-%d %h:%i %p\') AS eventToDateTime,' +
        'TRIM(te.isCrossTrack) AS eventIsCrossTrack,' +
        'TRIM(te.trackId) AS trackId,' +
        'TRIM(te.agendaId) AS agendaId,' +
        'TRIM(te.conferenceId) AS conferenceId,' +
        'TRIM(tet.id) AS eventTypeId,' +
        'TRIM(tet.name) AS eventTypeName ' +
        'FROM tbl_speaker ts JOIN tbl_speaker_event tse ON ts.id = tse.speakerId ' +
        'JOIN tbl_event te ON tse.eventId  = te.id JOIN tbl_event_type tet ON te.eventTypeId = tet.id ' +
        'WHERE tse.conferenceId = ' + utils.parseValue(conferenceId));

    return result;
}

var getAllSpeakerEvents = function () {
    var result = db.query('SELECT * FROM tbl_speaker_event');

    return result;
}

var getConferenceSpeakerWithEvent = function(speakerId) {
    var eventIdsObj = db.query('SELECT eventId FROM tbl_speaker_event WHERE speakerId=' +
        utils.parseValue(speakerId));

    if (eventIdsObj.length === 0) {
        return [];
    }

    log.info('----------------------------------------------');
    log.info(eventIdsObj);

    var eventIds = [];

    for (var i = 0; i < eventIdsObj.length; i++) {
        eventIds.push(Number(eventIdsObj[i].eventId));
    };

    log.info('----------------------------------------------');
    log.info(eventIds);

    var query = 'SELECT * FROM tbl_event WHERE id IN (' +
        eventIds.toString() +
        ')';

    log.info('----------------------------------------------');
    log.info(query);

    var events = db.query(query);

    return events;
}
