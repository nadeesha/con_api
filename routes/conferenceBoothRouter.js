/* jshint indent: false */

'use strict';

var conferenceBoothDao = require('/dao/conferenceBoothDao.js');

var postConferenceBooth = function (req, res) {
    var conferenceBooth = JSON.parse(req.getContent());

    if (!conferenceBooth.conferenceId || !conferenceBooth.boothId || !conferenceBooth.status) {
        res.status = 400;
        res.contentType = 'application/json';
        res.content = {
            message: 'Conference Booth should contain conferenceId, boothId and status'
        };
    } else {
        res.status = 200;
        conferenceBoothDao.createConferenceBooth(conferenceBooth);
    }
}

var putConferenceBooth = function (req, res) {
    var conferenceBooth = JSON.parse(req.getContent());

    if (!conferenceBooth.conferenceId || !conferenceBooth.boothId || !conferenceBooth.status) {
        res.status = 400;
        res.contentType = 'application/json';
        res.content = {
            message: 'Conference Booth should contain conferenceId, boothId and status'
        };
    } else {
        res.status = 200;
        conferenceBoothDao.updateConferenceBooth(conferenceBooth);
    }
}

var getAllActiveConferencesWithBooths = function (req, res) {
    res.status = 200;
    res.contentType = "application/json";
    res.content = conferenceBoothDao.getAllActiveConferencesWithBooths();
}