/* jshint indent: false */

'use strict';

var conferenceSponsorDao = require('/dao/conferenceSponsorDao.js');

var postConferenceSponsor = function (req, res) {
    var conferenceSponsor = JSON.parse(req.getContent());
    if (!conferenceSponsor.conferenceId || !conferenceSponsor.sponsorId || !conferenceSponsor.status) {
        res.status = 400;
        res.contentType = 'application/json';
        res.content = {
            message: 'Conference Sponsor should contain conferenceId, sponsorId and status'
        };
    } else {
        res.status = 200;
        conferenceSponsorDao.createConferenceSponsor(conferenceSponsor);
    }
}

var putConferenceSponsor = function (req, res) {
    var conferenceSponsor = JSON.parse(req.getContent());

    if (!conferenceSponsor.conferenceId || !conferenceSponsor.sponsorId || !conferenceSponsor.status) {
        res.status = 400;
        res.contentType = 'application/json';
        res.content = {
            message: 'Conference Sponsor should contain conferenceId, sponsorId and status'
        };
    } else {
        res.status = 200;
        conferenceSponsorDao.updateConferenceSponsor(conferenceSponsor);
    }
}

var getAllActiveConferencesWithSponsors = function (req, res) {
    res.status = 200;
    res.contentType = "application/json";
    res.content = conferenceSponsorDao.getAllActiveConferencesWithSponsors();
}