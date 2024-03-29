/* jshint indent: false */

'use strict';

var eventTypeDao = require('/dao/eventTypeDao.js');

var postEventType = function (req, res) {
    var eventType = JSON.parse(req.getContent());

    log.info('...................................');
    log.info(eventType);

    if (!eventType.name) {
        res.status = 400;
        res.contentType = 'application/json';
        res.content = {
            message: 'Event type should contain name'
        };
    } else {
        eventType.status = 1;
        eventTypeDao.createEventType(eventType);
        res.status = 200;
    }
};

var putEventType = function (req, res) {
    var eventType = JSON.parse(req.getContent());

    if (!eventType.name) {
        res.status = 400;
        res.contentType = 'application/json';
        res.content = {
            message: 'Event type should contain name'
        };
    } else {
        eventTypeDao.updateEventType(eventType, Number(req._params.id));
        res.status = 200;
    }
};

var getEventType = function (req, res) {
    var eventTypeId = req._params.id;
    if (eventTypeId) {
        var result = eventTypeDao.getEventTypeByEventTypeId(Number(eventTypeId));

        if (result) {
            res.status = 200;
            res.contentType = "application/json";
            res.content = result;
        } else {
            res.status = 400;
            res.contentType = 'application/json';
            res.content = {
                message: 'Event type data not found'
            };
        }
    }
};

var getAllEventType = function (req, res) {
    res.status = 200;
    res.contentType = 'application/json';
    res.content = eventTypeDao.getAllEventType();
};

var getAllActiveEventType = function (req, res) {
    var status = req._params.status;

    if (status && status === '1') {
        var result = eventTypeDao.getAllActiveEventType();

        if (result) {
            res.status = 200;
            res.contentType = "application/json";
            res.content = result;
        } else {
            res.status = 400;
            res.contentType = 'application/json';
            res.content = {
                message: 'Active Event type data not found'
            };
        }
    }
};