var log = new Log();

var db = require('/dao/db.js').db;

var createSpeakerEvent = function (speakerEvent) {
    var json = JSON.parse(speakerEvent);
    var result = db.query("INSERT INTO tbl_speaker_event (speakerId, eventId, eventTypeId, agendaId, conferenceId) VALUES (?, ?, ?, ?, ?)",
        json.speakerId, json.eventId, json.eventTypeId, json.agendaId, json.conferenceId);
    db.commit();
    return result;
}

var updateSpeakerEvent = function (speakerEvent) {
    var json = JSON.parse(speakerEvent);
    var result = db.query("UPDATE tbl_speaker_event SET eventId = ?, eventTypeId = ?, agendaId = ?, conferenceId = ? WHERE speakerId = ?",
        json.eventId, json.eventTypeId, json.agendaId, json.conferenceId, json.speakerId);
    db.commit();
    return result;
}

var deleteSpeakerEvent = function (speakerId, speakerEventId) {
    var result = db.query("DELETE FROM tbl_speaker_event WHERE speakerId = ? AND eventId = ?", speakerId, speakerEventId);
    db.commit();
    return result;
}