/* jshint indent: false */

'use strict';

var videoDao = require('/dao/videoDao.js');

var postVideo = function (req, res) {
    var video = JSON.parse(req.getContent());

    if (!video.link || !video.status || !video.conferenceId) {
        res.status = 400;
        res.contentType = 'application/json';
        res.content = {
            message: 'Video should contain link, status and conferenceId'
        };
    } else {
        res.status = 200;
        videoDao.createVideo(video);
    }
}

var putVideo = function (req, res) {
    var video = JSON.parse(req.getContent());

    if (!video.link || !video.status || !video.conferenceId) {
        res.status = 400;
        res.contentType = 'application/json';
        res.content = {
            message: 'Video should contain link, status and conferenceId'
        };
    } else {
        res.status = 200;
        videoDao.updateVideo(video, Number(req._params.id));
    }
}

var deleteVideo = function(req, res) {
    var videoId = req._params.id;

    if(videoId){
        res.status = 200;
        videoDao.deleteVideo(videoId);
    }
}

var getVideo = function (req, res) {
    var videoId = req._params.id;

    if (videoId) {
        var result = videoDao.getVideoByVideoId(videoId);

        if (result) {
            res.status = 200;
            res.contentType = "application/json";
            res.content = result;
        } else {
            res.status = 400;
            res.contentType = 'application/json';
            res.content = {
                message: 'Video data not found'
            };
        }
    }
}

var getAllVideos = function (req, res) {
    res.status = 200;
    res.contentType = "application/json";
    res.content = videoDao.getAllVideos();
}

var getAllActiveVideos = function (req, res) {
    var status = req._params.status;

    if (status && status === '1') {
        var result = videoDao.getAllActiveVideos();

        if (result) {
            res.status = 200;
            res.contentType = "application/json";
            res.content = result;
        } else {
            res.status = 400;
            res.contentType = 'application/json';
            res.content = {
                message: 'Active Video data not found'
            };
        }
    }
}

var getAllActiveVideosByConference = function (req, res) {
    var confId = req._params.confId;
    if (confId) {
        var result = videoDao.getAllActiveVideosByConference(confId);

        if (result) {
            res.status = 200;
            res.contentType = "application/json";
            res.content = result;
        } else {
            res.status = 400;
            res.contentType = 'application/json';
            res.content = {
                message: 'Video data not found for given conference'
            };
        }
    }
}