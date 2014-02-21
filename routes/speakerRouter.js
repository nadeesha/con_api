/* jshint indent: false */

'use strict';

var speakerDao = require('/dao/speakerDao.js');

var postSpeaker = function (req, res) {
    var speaker = JSON.parse(req.getContent());

    if (!speaker.name || !speaker.designation || !speaker.bio || !speaker.bioMobile) {
        res.status = 400;
        res.contentType = 'application/json';
        res.content = {
            message: 'Speaker should contain name, designation, bio, bioMobile and status'
        };
    } else {
        res.status = 200;
        speakerDao.createSpeaker(speaker);
    }
}

var putSpeaker = function (req, res) {
    var speaker = JSON.parse(req.getContent());

    if (!speaker.name || !speaker.designation || !speaker.bio || !speaker.bioMobile) {
        res.status = 400;
        res.contentType = 'application/json';
        res.content = {
            message: 'Speaker should contain name, designation, bio, bioMobile and status'
        };
    } else {
        speakerDao.updateSpeaker(speaker, Number(req._params.id));
        speaker.status = speaker.status || 1;
        res.status = 200;
    }
}

var getSpeaker = function (req, res) {
    var speakerId = req._params.id;

    if (speakerId) {
        var result = speakerDao.getSpeakerBySpeakerId(speakerId);

        if (result) {
            res.status = 200;
            res.contentType = "application/json";
            res.content = result;
        } else {
            res.status = 400;
            res.contentType = 'application/json';
            res.content = {
                message: 'Speaker data not found'
            };
        }
    }
}

var getAllSpeakers = function (req, res) {
    res.status = 200;
    res.contentType = "application/json";
    res.content = speakerDao.getAllSpeakers();
}

var getAllActiveSpeakers = function (req, res) {
    var status = req._params.status;

    if (status && status === '1') {
        var result = speakerDao.getAllActiveSpeakers();

        if (result) {
            res.status = 200;
            res.contentType = "application/json";
            res.content = result;
        } else {
            res.status = 400;
            res.contentType = 'application/json';
            res.content = {
                message: 'Active Speaker data not found'
            };
        }
    }
}

var getConferenceSpeakerWithEvent = function (req, res) {
    var speakerId = req._params.id;
    var confId = req._params.confId;

    if (speakerId && confId) {
        var result = speakerDao.getConferenceSpeakerWithEvent(speakerId, confId);

        if (result) {
            res.status = 200;
            res.contentType = "application/json";
            res.content = result;
        } else {
            res.status = 400;
            res.contentType = 'application/json';
            res.content = {
                message: 'Speaker data not found for given conference'
            };
        }
    }
}

var getAllConferenceSpeakersWithEvent = function (req, res) {
    var confId = req._params.confId;

    if (confId) {
        var result = speakerDao.getAllConferenceSpeakersWithEvent(confId);

        if (result) {
            res.status = 200;
            res.contentType = "application/json";
            res.content = result;
        } else {
            res.status = 400;
            res.contentType = 'application/json';
            res.content = {
                message: 'Speakers data not found for given conference'
            };
        }
    }
}