/* jshint indent: false */

'use strict';

var db = require('./db.js').db;
var utils = require('./utils.js');

var createRank = function (rank) {

    var values = [
        rank.userName,
        rank.points,
        rank.eventId
    ];

    utils.parseValues(values);

    db.query('INSERT INTO tbl_rank (userName, points, eventId) VALUES (' + values.toString() + ')');

    return;
}

var getRankByEventId = function (eventId) {

    var result = db.query('SELECT * FROM tbl_rank where eventId = ' + eventId);

    return result;
}

var getRankCountByEventId = function (eventId) {

    var result = db.query('SELECT COUNT(*) AS count FROM tbl_rank where eventId = ' + eventId);

    return result;
}