/* jshint indent: false */

'use strict';

var db = require('./db.js').db;
var utils = require('./utils.js');

var createSpeakerEvent = function (speakerEvent) {

    var values = [
        speakerEvent.speakerId,
        speakerEvent.eventId,
        speakerEvent.eventTypeId,
        speakerEvent.agendaId,
        speakerEvent.conferenceId
    ];

    utils.parseValues(values);

    var query = 'INSERT INTO tbl_speaker_event (speakerId, eventId, eventTypeId, agendaId, conferenceId) VALUES (' + values.toString() + ')';

    db.query(query);

    return;
}

var updateSpeakerEvent = function (speakerEvent) {

    db.query('UPDATE tbl_speaker_event SET ' +
        'eventId = ' + utils.parseValue(speakerEvent.eventId) + ', ' +
        'eventTypeId = ' + utils.parseValue(speakerEvent.eventTypeId) + ', ' +
        'agendaId = ' + utils.parseValue(speakerEvent.agendaId) + ', ' +
        'conferenceId = ' + utils.parseValue(speakerEvent.conferenceId) + ' ' +
        'WHERE speakerId = ' + utils.parseValue(speakerEvent.speakerId));

    return;
}

var deleteSpeakerEvent = function (speakerId, eventId) {
    db.query('DELETE FROM tbl_speaker_event WHERE speakerId = ' + utils.parseValue(speakerId) + ' ' +
        'AND eventId = ' + utils.parseValue(eventId));

    return;
}