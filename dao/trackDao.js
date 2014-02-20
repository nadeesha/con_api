/* jshint indent: false */

'use strict';

var db = require('./db.js').db;
var utils = require('./utils.js');

var createTrack = function (track) {

    var values = [
        track.name,
        track.agendaId,
        track.conferenceId
    ];

    utils.parseValues(values);

    var query = 'INSERT INTO tbl_track (name, agendaId, conferenceId) VALUES (' + values.toString() + ')';

    db.query(query);

    return;
}

var updateTrack = function (track, id) {

    db.query('UPDATE tbl_track SET ' +
        'name = ' + utils.parseValue(track.name) + ', ' +
        'agendaId = ' + utils.parseValue(track.agendaId) + ', ' +
        'conferenceId = ' + utils.parseValue(track.conferenceId) + ' ' +
        'WHERE id = ' + utils.parseValue(id));

    return;
}

var deleteTrack = function (trackId) {

    db.query('DELETE FROM tbl_track WHERE id = ' + utils.parseValue(trackId));

    return;
}

var getTrackByTrackId = function (trackId) {
    var result = db.query('SELECT * FROM tbl_track WHERE id = '+ utils.parseValue(trackId));

    return result;
}

var getAllTracks = function () {
    var result = db.query('SELECT * FROM tbl_track');
    return result;
}

var getTrackByAgendaWithEventsSpeakers = function (trackId, agendaId) {
    var result = db.query('SELECT ' +
        'TRIM(tt.id) AS trackId,' +
        'TRIM(tt.name) AS trackName,' +
        'TRIM(tt.agendaId) AS agendaId,' +
        'TRIM(tt.conferenceId) AS conferenceId,' +
        'TRIM(te.id) AS eventId,' +
        'TRIM(te.title)  AS eventTitle,' +
        'TRIM(te.description) AS eventDescription,' +
        'TRIM(te.venue) AS eventVenue,' +
        'DATE_FORMAT(te.fromDateTime, \'%Y-%m-%d %h:%i %p\') AS eventFromDateTime,' +
        'DATE_FORMAT(te.toDateTime, \'%Y-%m-%d %h:%i %p\') AS eventToDateTime,' +
        'TRIM(te.isCrossTrack) AS eventIsCrossTrack,' +
        'TRIM(ts.id) AS speakerId,' +
        'TRIM(ts.name) AS speakerName,' +
        'TRIM(ts.designation) AS speakerDesignation,' +
        'TRIM(ts.bio) AS speakerBio,' +
        'TRIM(ts.bioMobile) AS speakerBioMobile,' +
        'TRIM(ts.photo) AS speakerPhoto ' +
        'FROM tbl_track tt JOIN tbl_event te ON tt.id = te.trackId ' +
        'JOIN tbl_speaker_event tse ON te.id = tse.eventId JOIN tbl_speaker ts ON tse.speakerId = ts.id ' +
        'WHERE tt.id = ' + utils.parseValue(trackId) + ' AND tt.agendaId = ' + utils.parseValue(agendaId));
    return result;
}

var getAllTracksByAgendaWithEventsSpeakers = function (agendaId) {
    var result = db.query('SELECT ' +
        'TRIM(tt.id) AS trackId,' +
        'TRIM(tt.name) AS trackName,' +
        'TRIM(tt.agendaId) AS agendaId,' +
        'TRIM(tt.conferenceId) AS conferenceId,' +
        'TRIM(te.id) AS eventId,' +
        'TRIM(te.title)  AS eventTitle,' +
        'TRIM(te.description) AS eventDescription,' +
        'TRIM(te.venue) AS eventVenue,' +
        'DATE_FORMAT(te.fromDateTime, \'%Y-%m-%d %h:%i %p\') AS eventFromDateTime,' +
        'DATE_FORMAT(te.toDateTime, \'%Y-%m-%d %h:%i %p\') AS eventToDateTime,' +
        'TRIM(te.isCrossTrack) AS eventIsCrossTrack,' +
        'TRIM(ts.id) AS speakerId,' +
        'TRIM(ts.name) AS speakerName,' +
        'TRIM(ts.designation) AS speakerDesignation,' +
        'TRIM(ts.bio) AS speakerBio,' +
        'TRIM(ts.bioMobile) AS speakerBioMobile,' +
        'TRIM(ts.photo) AS speakerPhoto ' +
        'FROM tbl_track tt JOIN tbl_event te ON tt.id = te.trackId ' +
        'JOIN tbl_speaker_event tse ON te.id = tse.eventId JOIN tbl_speaker ts ON tse.speakerId = ts.id ' +
        'WHERE tt.agendaId = ' + utils.parseValue(agendaId));
    return result;
}