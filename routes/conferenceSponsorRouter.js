/* jshint indent: false */

'use strict';

var conferenceSponsorDao = require('/dao/conferenceSponsorDao.js');

var postConferenceSponsor = function (req, res) {
    var conferenceSponsor = (req.getContent());
    if (!conferenceSponsor.conferenceId || !conferenceSponsor.sponsorId) {
        res.status = 400;
        res.contentType = 'application/json';
        res.content = {
            message: 'Conference Sponsor should contain conferenceId, sponsorId and status'
        };
    } else {
        conferenceSponsor.status = 1;
        conferenceSponsorDao.createConferenceSponsor(conferenceSponsor);
        res.status = 200;
    }
}

var putConferenceSponsor = function (req, res) {
    var conferenceSponsor = (req.getContent());

    if (!conferenceSponsor.conferenceId || !conferenceSponsor.sponsorId) {
        res.status = 400;
        res.contentType = 'application/json';
        res.content = {
            message: 'Conference Sponsor should contain conferenceId, sponsorId and status'
        };
    } else {
        conferenceSponsor.status = conferenceSponsor.status || 1;
        conferenceSponsorDao.updateConferenceSponsor(conferenceSponsor);
        res.status = 200;
    }
}

var getAllActiveConferencesWithSponsors = function (req, res) {
    res.status = 200;
    res.contentType = "application/json";
    res.content = conferenceSponsorDao.getAllActiveConferencesWithSponsors();
}