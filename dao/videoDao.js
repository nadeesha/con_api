/* jshint indent: false */

'use strict';

var db = require('./db.js').db;
var utils = require('./utils.js');

var createVideo = function (video) {

    var values = [
        video.name,
        video.link,
        video.status,
        video.conferenceId
    ];

    utils.parseValues(values);

    db.query('INSERT INTO tbl_video (link, status, conferenceId) VALUES (' + values.toString() + ')');

    return;
}

var updateVideo = function (video, id) {

    db.query('UPDATE tbl_video SET ' +
        'name = ' + utils.parseValue(video.name) + ', ' +
        'link = ' + utils.parseValue(video.link) + ', ' +
        'status = ' + utils.parseValue(video.status) + ', ' +
        'conferenceId = ' + utils.parseValue(video.conferenceId) + ' ' +
        'WHERE id = ' + utils.parseValue(id));

    return;
}

var deleteVideo = function(videoId){

    db.query('DELETE FROM tbl_video WHERE id = '+utils.parseValue(id));

    return;
}

var getVideoByVideoId = function (videoId) {
    var result = db.query('SELECT * FROM tbl_video WHERE id = ' + utils.parseValue(videoId));

    return result;
}

var getAllVideos = function () {
    var result = db.query('SELECT * FROM tbl_video');

    return result;
}

var getAllActiveVideos = function () {
    var result = db.query('SELECT * FROM tbl_video WHERE status = 1');

    return result;
}

var getAllActiveVideosByConference = function (conferenceId) {
    var result = db.query('SELECT * FROM tbl_video WHERE conferenceId = ' + utils.parseValue(conferenceId) + ' AND status = 1');

    return result;
}