/* jshint indent: false */

'use strict';

var conferenceBoothDao = require('/dao/conferenceBoothDao.js');

var postConferenceBooth = function (req, res) {
    var conferenceBooth = JSON.parse(req.getContent());

    if (!conferenceBooth.conferenceId || !conferenceBooth.boothId) {
        res.status = 400;
        res.contentType = 'application/json';
        res.content = {
            message: 'Conference Booth should contain conferenceId, boothId and status'
        };
    } else {
        conferenceBooth.status = 1;
        conferenceBoothDao.createConferenceBooth(conferenceBooth);
        res.status = 200;
    }
}

var putConferenceBooth = function (req, res) {
    var conferenceBooth = JSON.parse(req.getContent());

    if (!conferenceBooth.conferenceId || !conferenceBooth.boothId) {
        res.status = 400;
        res.contentType = 'application/json';
        res.content = {
            message: 'Conference Booth should contain conferenceId, boothId and status'
        };
    } else {
        conferenceBooth.status = conferenceBooth.status || 1;
        conferenceBoothDao.updateConferenceBooth(conferenceBooth);
        res.status = 200;
    }
}

var getAllActiveConferencesWithBooths = function (req, res) {
    res.status = 200;
    res.contentType = "application/json";
    res.content = conferenceBoothDao.getAllActiveConferencesWithBooths();
}