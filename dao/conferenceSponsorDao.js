/* jshint indent: false */

'use strict';

var db = require('./db.js').db;
var utils = require('./utils.js');

var createConferenceSponsor = function (conferenceSponsor) {

    var values = [
        conferenceSponsor.conferenceId,
        conferenceSponsor.sponsorId,
        conferenceSponsor.status
    ];

    utils.parseValues(values);

    var query = 'INSERT INTO tbl_conference_sponsor (conferenceId, sponsorId, status) VALUES (' + values.toString() + ')';

    db.query(query);

    return;
}

var updateConferenceSponsor = function (conferenceSponsor) {

    db.query('UPDATE tbl_conference_sponsor SET ' +
        'sponsorId = ' + utils.parseValue(conferenceSponsor.sponsorId) + ', ' +
        'status = ' + utils.parseValue(conferenceSponsor.status) + ' ' +
        'WHERE conferenceId = ' + utils.parseValue(conferenceSponsor.conferenceId));

    return;
}

var getAllActiveConferencesWithSponsors = function () {
    var result = db.query('SELECT ' +
        'TRIM(tc.id) AS conferenceId, ' +
        'TRIM(tc.name) AS conferenceName, ' +
        'TRIM(tc.location) AS conferenceLocation, ' +
        'DATE_FORMAT(tc.startDate, \'%Y-%m-%d\') AS conferenceStartDate, ' +
        'DATE_FORMAT(tc.endDate, \'%Y-%m-%d\') AS conferenceEndDate, ' +
        'TRIM(tc.logo) AS conferenceLogo, ' +
        'TRIM(ts.id) AS sponsorId, ' +
        'TRIM(ts.name) AS sponsorName, ' +
        'TRIM(ts.logo) AS sponsorLogo, ' +
        'TRIM(ts.links) AS sponsorLinks ' +
        'FROM tbl_conference tc JOIN tbl_conference_sponsor tcs ON tc.id = tcs.conferenceId ' +
        'JOIN tbl_sponsor ts ON tcs.sponsorId =  ts.id WHERE tcs.status = 1 AND tc.status = 1 ' +
        'AND ts.status = 1');

    return result;
}