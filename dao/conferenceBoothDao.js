/* jshint indent: false */

'use strict';

var db = require('./db.js').db;
var utils = require('./utils.js');

var createConferenceBooth = function (conferenceBooth) {

    var values = [
        conferenceBooth.conferenceId,
        conferenceBooth.boothId,
        conferenceBooth.status
    ];

    utils.parseValues(values);

    var query = 'INSERT INTO tbl_conference_booth (conferenceId, boothId, status) VALUES (' + values.toString() + ')';

    db.query(query);

    return;
}

var updateConferenceBooth = function (conferenceBooth) {
    db.query('UPDATE tbl_conference_booth SET ' +
        'boothId = ' + utils.parseValue(conferenceBooth.boothId) + ', ' +
        'status = ' + utils.parseValue(conferenceBooth.status) + ' ' +
        'WHERE conferenceId = ' + utils.parseValue(conferenceBooth.conferenceId));

    return result;
}

var getAllActiveConferencesWithBooths = function () {
    var result = db.query('SELECT ' +
        'TRIM(tc.id) AS conferenceId, ' +
        'TRIM(tc.name) AS conferenceName, ' +
        'TRIM(tc.location) AS conferenceLocation, ' +
        'DATE_FORMAT(tc.startDate, \'%Y-%m-%d\') AS conferenceStartDate, ' +
        'DATE_FORMAT(tc.endDate, \'%Y-%m-%d\') AS conferenceEndDate, ' +
        'TRIM(tc.logo) AS conferenceLogo, ' +
        'TRIM(tb.id) AS boothId, ' +
        'TRIM(tb.name) boothName, ' +
        'TRIM(tb.logo) boothLogo, ' +
        'TRIM(tb.links) boothLinks FROM tbl_conference tc JOIN tbl_conference_booth tcb ON tc.id = tcb.conferenceId ' +
        'JOIN tbl_booth tb ON tcb.boothId = tb.id WHERE tcb.status = 1 AND tc.status = 1 AND tb.status = 1');
    return result;
}