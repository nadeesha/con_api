/* jshint indent: false */

'use strict';

var db = require('./db.js').db;
var utils = require('./utils.js');

var createBooth = function (booth) {

    var values = [
        booth.name,
        booth.logo,
        booth.links,
        1
    ];

    utils.parseValues(values);

    var query = 'INSERT INTO tbl_booth (name, logo, links, status) ' +
        'VALUES (' + values.toString() + ')';

    db.query(query);

    return;
}

var updateBooth = function (booth, id) {

    db.query('UPDATE tbl_booth SET ' +
        'name = ' + utils.parseValue(booth.name) + ', ' +
        'logo = ' + utils.parseValue(booth.logo) + ', ' +
        'links = ' + utils.parseValue(booth.links) + ', ' +
        'status = ' + utils.parseValue(booth.status) + ' ' +
        'WHERE id = ' + utils.parseValue(id) + ')');

    return;
}

var getBoothByBoothId = function (boothId) {
    var result = db.query('SELECT * FROM tbl_booth WHERE id = ' + utils.parseValue(boothId));

    return result;
}

var getAllBooths = function () {
    var result = db.query("SELECT * FROM tbl_booth");

    return result;
}

var getAllActiveBooths = function () {
    var result = db.query("SELECT * FROM tbl_booth WHERE status = 1");

    return result;
}

var getAllActiveBoothByConference = function (conferenceId) {
    var result = db.query('SELECT * FROM tbl_booth tb JOIN tbl_conference_booth tcb ON tb.id = tcb.boothId ' +
        'WHERE tcb.conferenceId = ' + utils.parseValue(conferenceId) + ' AND tcb.status = 1');

    return result;
}
