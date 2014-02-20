/* jshint indent: false */

'use strict';

var db = require('./db.js').db;
var utils = require('./utils.js');

var createAgenda = function (agenda) {

    var values = [
        agenda.name,
        agenda.date,
        agenda.conferenceId
    ];

    utils.parseValues(values);

    var query = 'INSERT INTO tbl_agenda (name, date, conferenceId) VALUES (' + values.toString() + ')';

    db.query(query);

    return;
}

var updateAgenda = function (agenda, id) {

    db.query('UPDATE tbl_agenda SET ' +
        'name = ' + utils.parseValue(agenda.name) + ', ' +
        'date = ' + utils.parseValue(agenda.date) + ', ' +
        'conferenceId = ' + utils.parseValue(agenda.conferenceId) + ' ' +
        'WHERE id = ' + utils.parseValue(id));

    return;
}

var deleteAgenda = function (agendaId) {
    db.query('DELETE FROM tbl_agenda WHERE id = ' + utils.parseValue(agendaId));

    return;
}

var getAgendaByAgendaId = function (agendaId) {
    var result = db.query('SELECT id, name, DATE_FORMAT(date, \'%Y-%m-%d\') AS date, conferenceId ' +
        'FROM tbl_agenda WHERE id = ' + utils.parseValue(agendaId));

    return result;
}

var getAllAgendaByConference = function (conferenceId) {
    var result = db.query('SELECT id, name, DATE_FORMAT(date, \'%Y-%m-%d\') AS date, conferenceId ' +
        'FROM tbl_agenda WHERE conferenceId = ' + utils.parseValue(conferenceId));

    return result;
}

var getAgendaByConferenceWithTracksEventsSpeakers = function (agendaId, conferenceId) {
    var result = db.query('SELECT ' +
        'TRIM(ta.id) AS agendaId,' +
        'TRIM(ta.name) AS agendaName,' +
        'DATE_FORMAT(date, \'%Y-%m-%d\') AS agendaDate,' +
        'TRIM(ta.conferenceId) AS conferenceId,' +
        'TRIM(tt.id) AS trackId,' +
        'TRIM(tt.name) AS trackName,' +
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
        'FROM tbl_agenda ta JOIN tbl_track tt ON ta.id = tt.agendaId ' +
        'JOIN tbl_event te ON tt.id = te.trackId JOIN tbl_speaker_event tse ON te.id = tse.eventId ' +
        'JOIN tbl_speaker ts ON tse.speakerId = ts.id WHERE ta.id = ' + utils.parseValue(agendaId) + ' ' +
        'AND ta.conferenceId = ' + utils.parseValue(conferenceId));

    return result;
}

var getAllAgendaByConferenceWithTracksEventsSpeakers = function (conferenceId) {
    var result = db.query('SELECT ' +
        'TRIM(ta.id) AS agendaId,' +
        'TRIM(ta.name) AS agendaName,' +
        'DATE_FORMAT(date, \'%Y-%m-%d\') AS agendaDate,' +
        'TRIM(ta.conferenceId) AS conferenceId,' +
        'TRIM(tt.id) AS trackId,' +
        'TRIM(tt.name) AS trackName,' +
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
        'FROM tbl_agenda ta JOIN tbl_track tt ON ta.id = tt.agendaId ' +
        'JOIN tbl_event te ON tt.id = te.trackId JOIN tbl_speaker_event tse ON te.id = tse.eventId ' +
        'JOIN tbl_speaker ts ON tse.speakerId = ts.id WHERE ta.conferenceId = ' + utils.parseValue(conferenceId));

    return result;
}