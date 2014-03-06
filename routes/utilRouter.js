var conferenceDao = require('/dao/conferenceDao.js');
var agendaDao = require('/dao/agendaDao.js');
var boothDao = require('/dao/boothDao.js');
var trackDao = require('/dao/trackDao.js');
var sponsorDao = require('/dao/sponsorDao.js');
var videoDao = require('/dao/videoDao.js');
var versionDao = require('/dao/versionDao.js');
var speakerDao = require('/dao/speakerDao.js');
var eventTypeDao = require('/dao/eventTypeDao.js');
var eventDao = require('/dao/eventDao.js');
var versionDao = require('/dao/versionDao.js');
var eventCategoryDao = require('/dao/eventCategoryDao.js');

var getEverything = function(req, res) {
	'use strict';
	var everything = {};

	var log = new Log();

	everything.conferences = conferenceDao.getAllConferences();
	log.info(everything.conferences);

	for (var i = 0; i < everything.conferences.length; i++) {
		var conferenceId = everything.conferences[i].id;

		log.info('------------------------------');
		log.info(conferenceId);
		everything.conferences[i].agendas = agendaDao.getAllAgendaByConference(Number(conferenceId));

		var agendas = everything.conferences[i].agendas;

		for (var j = 0; j < agendas.length; j++) {
			var agendaId = agendas[j].id;
			agendas[j].tracks = trackDao.getAllTracks(Number(agendaId));

			var tracks = agendas[j].tracks;

			for (var k = 0; k < tracks.length; k++) {
				var trackId = tracks[k].id;

				tracks[k].events = eventDao.getAllEventByTrack(Number(agendaId), Number(trackId));
			}
		}

		everything.sponsors = sponsorDao.getAllSponsors();
		everything.conferences[i].sponsors = sponsorDao.getAllActiveSponsorsByConference(Number(conferenceId));

		everything.booths = boothDao.getAllBooths();
		everything.conferences[i].booths = boothDao.getAllActiveBoothByConference(Number(conferenceId));

		everything.videos = videoDao.getAllVideos();
		everything.conferences[i].videos = videoDao.getAllActiveVideosByConference(Number(conferenceId));

		everything.speakers = speakerDao.getAllSpeakers();
		for (var s = 0; s < everything.speakers.length; s++) {
			delete everything.speakers[s].bio;
		}

		everything.eventTypes = eventTypeDao.getAllEventType();

		everything.speakerEventMapping = speakerDao.getAllSpeakerEvents();
		everything.eventCategories = eventCategoryDao.getEventCategories();

		everything.version = versionDao.getVersion();

		res.status = 200;
		res.contentType = "application/json";
		res.content = everything;
	}
};
