/* jshint indent: false */

'use strict';

var db = require('/dao/db.js').db;
var utils = require('./utils.js');

var createSponsor = function (sponsor) {

    var values = [
        sponsor.name,
        sponsor.logo,
        sponsor.links,
        1
    ];

    var query = 'INSERT INTO tbl_sponsor (name, logo, links, status) VALUES (' + values.toString() + ')';

    return;
}

var updateSponsor = function (sponsor, id) {

    db.query('UPDATE tbl_sponsor SET ' +
        'name = ' + utils.parseValue(sponsor.name) + ', ' +
        'logo = ' + utils.parseValue(sponsor.logo) + ', ' +
        'links = ' + utils.parseValue(sponsor.links) + ', ' +
        'status = ' + utils.parseValue(sponsor.status) + ' ' +
        'WHERE id = ' + utils.parseValue(id));

    return;
}

var getSponsorBySponsorId = function (sponsorId) {
    var result = db.query('SELECT * FROM tbl_sponsor WHERE id = ' + utils.parseValue(sponsorId));

    return result;
}

var getAllSponsors = function () {
    var result = db.query('SELECT * FROM tbl_sponsor');

    return result;
}

var getAllActiveSponsors = function () {
    var result = db.query('SELECT * FROM tbl_sponsor WHERE status = 1');

    return result;
}

var getAllActiveSponsorsByConference = function (conferenceId) {
    var result = db.query('SELECT * FROM tbl_sponsor ts JOIN tbl_conference_sponsor tcs ON ts.id = tcs.sponsorId ' +
        'WHERE tcs.conferenceId = ' + utils.parseValue(conferenceId) + ' AND tcs.status = 1');

    return result;
}