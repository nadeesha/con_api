/* jshint indent: false */

'use strict';

var db = require('./db.js').db;
var utils = require('./utils.js');

var createComment = function (comment) {

    var values = [
        comment.userName,
        comment.comment,
        comment.eventId
    ];

    utils.parseValues(values);

    db.query('INSERT INTO tbl_comments (userName, comment, eventId) VALUES (' + values.toString() + ')');

    return;
}

var getCommentByEventId = function (eventId) {

    var result = db.query('SELECT * FROM tbl_comments where eventId = ' + eventId);

    return result;
}

var getCommentCountByEventId = function (eventId) {

    var result = db.query('SELECT COUNT(*) AS count FROM tbl_comments where eventId = ' + eventId);

    return result;
}