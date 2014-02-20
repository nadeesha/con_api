/* jshint indent: false */

'use strict';

var db = require('./db.js').db;
var utils = require('./utils.js');

var createConference = function(conf) {
    var values = [
        conf.name,
        conf.location,
        conf.startDate,
        conf.endDate,
        conf.logo,
        1
    ];

    utils.parseValues(values);

    var query = 'INSERT INTO tbl_conference (name, location, startDate, endDate, logo, status) ' +
        'VALUES (' + values.toString() + ')';

    db.query(query);

    // we may need to find a way to return the result, but db.query() does not
    // do this
    return;
};

var updateConference = function(conf, id) {

    var query = 'UPDATE tbl_conference SET ' +
        'name = ' + utils.parseValue(conf.name) + ', ' +
        'location = ' + utils.parseValue(conf.location) + ', ' +
        'startDate = ' + utils.parseValue(conf.startDate) + ', ' +
        'endDate = ' + utils.parseValue(conf.endDate) + ', ' +
        'logo = ' + utils.parseValue(conf.logo) + ', ' +
        'status = ' + utils.parseValue(conf.status) + ' ' + // past conference need to deactivate
        'WHERE id = ' + utils.parseValue(id);

    db.query(query);

    return;
};

var getConferenceByConferenceId = function (conferenceId) {
    var result = db.query('SELECT id, name, location, ' +
        'DATE_FORMAT(startDate, \'%Y-%m-%d\') AS startDate, ' +
        'DATE_FORMAT(endDate, \'%Y-%m-%d\') AS endDate, ' +
        'logo, status FROM tbl_conference WHERE id = ' +
        utils.parseValue(conferenceId));

    return result;
};

var getAllConferences = function () {
    var result = db.query('SELECT id, name, location, ' +
        'DATE_FORMAT(startDate, \'%Y-%m-%d\') AS startDate, ' +
        'DATE_FORMAT(endDate, \'%Y-%m-%d\') AS endDate, ' + 'logo, status FROM tbl_conference');
    return result;
};

var getAllActiveConferences = function () {
    var result = db.query('SELECT id, name, location, ' +
        'DATE_FORMAT(startDate, \'%Y-%m-%d\') AS startDate, ' +
        'DATE_FORMAT(endDate, \'%Y-%m-%d\') AS endDate, ' + 'logo, status FROM tbl_conference WHERE status = 1');
    return result;
};