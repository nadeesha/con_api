/* jshint indent: false */

'use strict';

var conferenceDao = require('/dao/conferenceDao.js');

var postConference = function(req, res) {
    var conference = JSON.parse(req.getContent());

    log.info(req.getContent());

    if (!conference.name || !conference.location || !conference.startDate || !conference.endDate || !conference.logo) {
        res.status = 400;
        res.contentType = 'application/json';
        res.content = {
            message: 'Conference should contain name, location, start date, end date and logo'
        };
    } else {
        conferenceDao.createConference(conference);
        res.status = 200;
    }
};

var putConference = function(req, res) {
    var conference = JSON.parse(req.getContent());

    if (!conference.name || !conference.location || !conference.startDate || !conference.endDate || !conference.logo) {
        res.status = 400;
        res.contentType = 'application/json';
        res.content = {
            message: 'Conference should contain id, name, location, start date, end date and logo'
        };
    } else {
        conferenceDao.updateConference(conference, Number(req._params.id));
        res.status = 200;
    }
};

var getConference = function(req, res) {
    var conferenceId = req._params.id;
    if (conferenceId) {
        var result = conferenceDao.getConferenceByConferenceId(Number(conferenceId));

        if (result) {
            res.status = 200;
            res.contentType = 'application/json';
            res.content = result;
        } else {
            res.status = 400;
            res.contentType = 'application/json';
            res.content = {
                message: 'Conference data not found'
            };
        }
    }
};

var getAllConferences = function(req, res) {
    res.status = 200;
    res.contentType = 'application/json';
    res.content = conferenceDao.getAllConferences();
};

var getActiveConferences = function (req, res) {
    var status = req._params.status;

    if (status && status === '1') {
        var result = conferenceDao.getAllActiveConferences();
        if (result) {
            res.status = 200;
            res.contentType = 'application/json';
            res.content = result;
        } else {
            res.status = 400;
            res.contentType = 'application/json';
            res.content = {
                message: 'Active conference data not found'
            };
        }
    }
};