/* jshint indent: false */

'use strict';

var eventDao = require('/dao/eventDao.js');

var postEvent = function(req, res) {
    var event = (req.getContent());

    if (!event.title || !event.description || !event.venue || !event.fromDateTime || !event.toDateTime || typeof event.isCrossTrack === 'undefined' || !event.eventTypeId) {
        res.status = 400;
        res.contentType = 'application/json';
        res.content = {
            message: 'Event should contain title, description, venue, fromDateTime, toDateTime, isCrossTrack, eventTypeId, trackId, agendaId and conferenceId'
        };
    } else {
        event.trackId = req._params.trackId;
        event.agendaId = req._params.agendaId;
        event.conferenceId = req._params.confId;

        // event.fromDateTime = new Date();
        // event.toDateTime = new Date();
        eventDao.createEvent(event);
        res.status = 200;
    }
}

var putEvent = function(req, res) {
    var event = (req.getContent());

    if (!event.title || !event.description || !event.venue || !event.fromDateTime || !event.toDateTime || typeof event.isCrossTrack === 'undefined' || !event.eventTypeId) {
        res.status = 400;
        res.contentType = 'application/json';
        res.content = {
            message: 'Event should contain title, description, venue, fromDateTime, toDateTime, isCrossTrack, eventTypeId, trackId, agendaId and conferenceId'
        };
    } else {
        event.trackId = req._params.trackId;
        event.agendaId = req._params.agendaId;
        event.conferenceId = req._params.confId;
        log.info('................................................................................');
        log.info(event.fromDateTime);
        eventDao.updateEvent(event, Number(req._params.id));
        res.status = 200;
    }
}

var deleteEvent = function(req, res) {
    var eventId = req._params.id;

    if (eventId) {
        res.status = 200;
        eventDao.deleteEvent(Number(eventId));
    }
}

var getEvent = function(req, res) {
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

var getEventByEventIdWithSpekers = function(req, res) {
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

var getAllEventByTrack = function(req, res) {
    var result = eventDao.getAllEventByTrack(Number(req._params.agendaId), Number(req._params.trackId));

    res.status = 200;
    res.contentType = "application/json";
    res.content = result;
}

var getAllEvents = function(req, res) {
    var result = eventDao.getAllEvents();

    res.status = 200;
    res.contentType = "application/json";
    res.content = result;
}

var getAllEventByEventTypeWithSpeakers = function(req, res) {
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

var getAllEventByTrackWithEventTypesSpeakers = function(req, res) {
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

var getAllEventBySpeakerWithEventType = function(req, res) {
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