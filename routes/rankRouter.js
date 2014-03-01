/* jshint indent: false */

'use strict';

var rankDao = require('/dao/rankDao.js');

var postRank = function (req, res) {
    var rank = JSON.parse(req.getContent());

    if (!rank.userName || !rank.points || !rank.eventId) {
        res.status = 400;
        res.contentType = 'application/json';
        res.content = {
            message: 'Rank should contain userName, points and eventId'
        };
    } else {
        res.status = 200;
        rankDao.createRank(comment);
    }
}


var getRankByEventId = function (req, res) {
    var eventId = req._params.eventId;

    if (eventId) {
        var result = rankDao.getRankByEventId(eventId);

        if (result) {
            res.status = 200;
            res.contentType = "application/json";
            res.content = result;
        } else {
            res.status = 400;
            res.contentType = 'application/json';
            res.content = {
                message: 'Rank data not found'
            };
        }
    }
}

var getRankCountByEventId = function (req, res) {
    var eventId = req._params.eventId;

    if (eventId) {
        var result = rankDao.getRankCountByEventId(eventId);

        if (result) {
            res.status = 200;
            res.contentType = "application/json";
            res.content = result;
        } else {
            res.status = 400;
            res.contentType = 'application/json';
            res.content = {
                message: 'Rank data not found'
            };
        }
    }
}