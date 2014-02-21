/* jshint indent: false */

'use strict';

var speakerEventDao = require('/dao/speakerEventDao.js');

var postSpeakerEvent = function (req, res, session) {
    var speakerEvent = JSON.parse(req.getContent());

    if (!speakerEvent.speakerId || !speakerEvent.eventId || !speakerEvent.eventTypeId || !speakerEvent.agendaId || !speakerEvent.conferenceId) {
        res.status = 400;
        res.contentType = 'application/json';
        res.content = {
            message: 'Speaker Event should contain speakerId, eventId, eventTypeId, agendaId and conferenceId'
        };
    } else {
        res.status = 200;
        speakerEventDao.createSpeakerEvent(speakerEvent);
    }
}

var putSpeakerEvent = function (req, res, session) {
    var speakerEvent = JSON.parse(req.getContent());

    if (!speakerEvent.speakerId || !speakerEvent.eventId || !speakerEvent.eventTypeId || !speakerEvent.agendaId || !speakerEvent.conferenceId) {
        res.status = 400;
        res.contentType = 'application/json';
        res.content = {
            message: 'Speaker Event should contain speakerId, eventId, eventTypeId, agendaId and conferenceId'
        };
    } else {
        res.status = 200;
        speakerEventDao.updateSpeakerEvent(speakerEvent);
    }
}

var deleteSpeakerEvent = function (req, res, session) {
    var speakerId = req._params.spkrId;
    var eventId = req._params.evntId;

    if (speakerId && eventId) {
        res.status = 200;
        speakerEventDao.deleteSpeakerEvent(speakerId, eventId);
    }
}