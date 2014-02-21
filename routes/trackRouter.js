/* jshint indent: false */

'use strict';

var trackDao = require('/dao/trackDao.js');

var postTrack = function(req,res){
    var track = JSON.parse(req.getContent());

        if(!track.name || !track.agendaId || !track.conferenceId){
            res.status = 400;
            res.contentType = 'application/json';
            res.content = {
                message: 'Track should contain name, agendaId and conferenceId'
            };
        } else {
            res.status = 200;
            trackDao.createTrack(track);
        }
}

var putTrack = function(req,res) {
    var track = JSON.parse(req.getContent());

        if(!track.name || !track.agendaId || !track.conferenceId){
            res.status = 400;
            res.contentType = 'application/json';
            res.content = {
                message: 'Track should contain id, name, agendaId and conferenceId'
            };
        } else {
            res.status = 200;
            trackDao.updateTrack(track);
        }
}

var deleteTrack = function(req,res) {
    var trackId = req._params.id;
    if(trackId){
        res.status = 200;
        trackDao.deleteTrack(trackId);
    }
}

var getTrack = function(req,res) {
    var trackId = req._params.id;

    if(trackId){
        var result = trackDao.getTrackByTrackId(trackId);

        if(result) {
            res.status = 200;
            res.contentType = "application/json";
            res.content = result;
        } else {
            res.status = 400;
            res.contentType = 'application/json';
            res.content = {
                message: 'Track data not found'
            };
        }
    }
}

var getAllTracks = function(req,res) {
    res.status = 200;
    res.contentType = "application/json";
    res.content = trackDao.getAllTracks();
}

var getTrackByAgendaWithEventsSpeakers = function(req,res) {
    var trackId = req._params.id;
    var agendaId = req._params.agendId;

    if(trackId && agendaId){

        var result = trackDao.getTrackByAgendaWithEventsSpeakers(trackId, agendaId);

        if(result){
            res.status = 200;
            res.contentType = "application/json";
            res.content = result;
        } else {
            res.status = 400;
            res.contentType = 'application/json';
            res.content = {
                message: 'Track data not found for given agenda'
            };
        }
    }
}

var getAllTracksByAgendaWithEventsSpeakers = function(req,res) {
    var agendaId = req._params.agendId;

    if(agendaId){
        var result = trackDao.getAllTracksByAgendaWithEventsSpeakers(agendaId);

        if(result){
            res.status = 200;
            res.contentType = "application/json";
            res.content = result;
        } else {
            res.status = 400;
            res.contentType = 'application/json';
            res.content = {
                message: 'Track data not found for given agenda'
            };
        }
    }
}