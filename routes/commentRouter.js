/* jshint indent: false */

'use strict';

var commentDao = require('/dao/commentDao.js');

var postComment = function (req, res) {
    var comment = JSON.parse(req.getContent());

    if (!comment.userName || !comment.comment || !comment.eventId) {
        res.status = 400;
        res.contentType = 'application/json';
        res.content = {
            message: 'Comment should contain userName, comment and eventId'
        };
    } else {
        res.status = 200;
        commentDao.createComment(comment);
    }
}


var getCommentByEventId = function (req, res) {
    var eventId = req._params.eventId;

    if (eventId) {
        var result = commentDao.getCommentByEventId(eventId);

        if (result) {
            res.status = 200;
            res.contentType = "application/json";
            res.content = result;
        } else {
            res.status = 400;
            res.contentType = 'application/json';
            res.content = {
                message: 'Comment data not found'
            };
        }
    }
}

var getCommentCountByEventId = function (req, res) {
    var eventId = req._params.eventId;

    if (eventId) {
        var result = commentDao.getCommentCountByEventId(eventId);

        if (result) {
            res.status = 200;
            res.contentType = "application/json";
            res.content = result;
        } else {
            res.status = 400;
            res.contentType = 'application/json';
            res.content = {
                message: 'Comment data not found'
            };
        }
    }
}