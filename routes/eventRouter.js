/* jshint indent: false */

'use strict';

var eventDao = require('/dao/eventDao.js');

var postEvent = function (req, res) {
    var event = JSON.parse(req.getContent());

    if (!event.title || !event.description || !event.venue || !event.fromDateTime || !event.toDateTime || !event.isCrossTrack || !event.eventTypeId || !event.trackId || !event.agendaId || !event.conferenceId) {
        res.status = 400;
        res.contentType = 'application/json';
        res.content = {
            message: 'Event should contain title, description, venue, fromDateTime, toDateTime, isCrossTrack, eventTypeId, trackId, agendaId and conferenceId'
        };
    } else {
        res.status = 200;
        eventDao.createEvent(event);
    }
}

var putEvent = function (req, res) {
    var event = JSON.parse(req.getContent());

    if (!event.title || !event.description || !event.venue || !event.fromDateTime || !event.toDateTime || !event.isCrossTrack || !event.eventTypeId || !event.trackId || !event.agendaId || !event.conferenceId) {
        res.status = 400;
        res.contentType = 'application/json';
        res.content = {
            message: 'Event should contain title, description, venue, fromDateTime, toDateTime, isCrossTrack, eventTypeId, trackId, agendaId and conferenceId'
        };
    } else {
        res.status = 200;
        eventDao.updateEvent(event, Number(req._params.id));
    }
}

var deleteEvent = function (req, res) {
    var eventId = req._params.id;

    if (eventId) {
        res.status = 200;
        eventDao.deleteEvent(Number(eventId));
    }
}

var getEvent = function (req, res) {
    var eventId = req._params.id;

    if (eventId) {
        var result = eventDao.getEventByEventId(Number(eventId));

        if (result) {
            res.status = 200;
            res.contentType = "application/json";
            res.content = result;
        } else {
            res.status = 400;
            res.contentType = 'application/json';
            res.content = {
                message: 'Event data not found'
            };
        }
    }
}

var getEventByEventIdWithSpekers = function (req, res) {
    var eventId = req._params.id;

    if (eventId) {
        var result = eventDao.getEventByEventIdWithSpekers(Number(eventId));

        if (result) {
            res.status = 200;
            res.contentType = "application/json";
            res.content = result;
        } else {
            res.status = 400;
            res.contentType = 'application/json';
            res.content = {
                message: 'Event data not found'
            };
        }
    }
}

var getAllEventByTrack = function (req, res) {
    var trackId = req._params.trckId1;

    if (trackId) {
        var result = eventDao.getAllEventByTrack(Number(trackId));

        if (result) {
            res.status = 200;
            res.contentType = "application/json";
            res.content = result;
        } else {
            res.status = 400;
            res.contentType = 'application/json';
            res.content = {
                message: 'Event data not found for given track'
            };
        }
    }
}

var getAllEventByEventTypeWithSpeakers = function (req, res) {
    var eventTypeId = req._params.eveTypId;

    if (eventTypeId) {
        var result = eventDao.getAllEventByEventTypeWithSpeakers(Number(eventTypeId));
    }
    if (result) {
        res.status = 200;
        res.contentType = "application/json";
        res.content = result;
    } else {
        res.status = 400;
        res.contentType = 'application/json';
        res.content = {
            message: 'Event data not found for given event type'
        };
    }
}

var getAllEventByTrackWithEventTypesSpeakers = function (req, res) {
    var trackId = req._params.trckId2;

    if (trackId) {
        var result = eventDao.getAllEventByTrackWithEventTypesSpeakers(Number(trackId));

        if (result) {
            res.status = 200;
            res.contentType = "application/json";
            res.content = result;
        } else {
            res.status = 400;
            res.contentType = 'application/json';
            res.content = {
                message: 'Event data not found for given track'
            };
        }
    }
}

var getAllEventBySpeakerWithEventType = function (req, res) {
    var speakerId = req._params.spkrId;

    if (speakerId) {

        var result = eventDao.getAllEventBySpeakerWithEventType(Number(speakerId));

        if (result) {
            res.status = 200;
            res.contentType = "application/json";
            res.content = result;
        } else {
            res.status = 400;
            res.contentType = 'application/json';
            res.content = {
                message: 'Event data not found for given speaker'
            };
        }
    }
}