/* jshint indent: false */

'use strict';

var agendaDao = require('/dao/agendaDao.js');

var postAgenda = function (req, res) {
    var agenda = (req.getContent());

    if (!agenda.name || !agenda.date) {
        res.status = 400;
        res.contentType = 'application/json';
        res.content = {
            message: 'Agenda should contain name, date and conferenceId'
        }
    } else {
        agenda.status = 1;
        agenda.conferenceId = req._params.confId;
        agendaDao.createAgenda(agenda);
        res.status = 200;
    }
}

var putAgenda = function (req, res) {
    var agenda = (req.getContent());
        if (!agenda.name || !agenda.date || !agenda.conferenceId) {
            res.status = 400;
            res.contentType = 'application/json';
            res.content = {
                message: 'Agenda should contain name, date and conferenceId'
            }
        } else {
            agenda.status = agenda.status || 1;
            agendaDao.updateAgenda(agenda, Number(req._params.agendaId));
            res.status = 200;
        }
}

var deleteAgenda = function (req, res) {
    var agendaId = req._params.agendaId;
    if (agendaId) {
        res.status = 200;
        agendaDao.deleteAgenda(agendaId);
    }
}

var getAgenda = function (req, res) {
    var agendaId = req._params.agendaId;
    if (agendaId) {
        var result = agendaDao.getAgendaByAgendaId(Number(agendaId));

        if (result) {
            res.status = 200;
            res.contentType = "application/json";
            res.content = result;
        } else {
            res.status = 400;
            res.contentType = 'application/json';
            res.content = {
                message: 'Agenda data not found'
            };
        }
    }
}

var getAllAgendaByConference = function (req, res) {
    var conferenceId = req._params.confId;
    if (conferenceId) {
        var result = agendaDao.getAllAgendaByConference(Number(conferenceId));

        if (result) {
            res.status = 200;
            res.contentType = "application/json";
            res.content = result;
        } else {
            res.status = 400;
            res.contentType = 'application/json';
            res.content = {
                message: 'Agenda data not found for given conference'
            };
        }
    }
}

var getAgendaByConferenceWithTracksEventsSpeakers = function (req, res) {
    var agendaId = req._params.agendaId;
    var conferenceId = req._params.confId;
    if (agendaId && conferenceId) {
        var result = agendaDao.getAgendaByConferenceWithTracksEventsSpeakers(Number(agendaId), Number(conferenceId));

        if (result) {
            res.status = 200;
            res.contentType = "application/json";
            res.content = result;
        } else {
            res.status = 400;
            res.contentType = 'application/json';
            res.content = {
                message: 'Agenda data not found for given conference'
            };
        }
    }
}

var getAllAgendaByConferenceWithTracksEventsSpeakers = function (req, res) {
    var conferenceId = req._params.confId;
    if (conferenceId) {
        var result = agendaDao.getAllAgendaByConferenceWithTracksEventsSpeakers(Number(conferenceId));

        if (result) {
            res.status = 200;
            res.contentType = "application/json";
            res.content = result;
        } else {
            res.status = 400;
            res.contentType = 'application/json';
            res.content = {
                message: 'Agenda data not found for given conference'
            };
        }
    }
}