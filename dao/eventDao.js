var log = new Log();

var db = require('/dao/db.js').db;

var createEvent = function (event) {
    var json = JSON.parse(event);
    var result = db.query("INSERT INTO tbl_event (title, description, venue, fromDateTime, toDateTime, isCrossTrack, " +
        "eventTypeId, trackId, agendaId, conferenceId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        json.title, json.description, json.venue, json.fromDateTime, json.toDateTime, json.isCrossTrack, json.eventTypeId, json.trackId, json.agendaId, json.conferenceId);
    db.commit();
    return result;
}

var updateEvent = function (event) {
    var json = JSON.parse(event);
    var result = db.query("UPDATE tbl_event SET title = ?, description = ?, venue = ?, fromDateTime = ?, toDateTime = ?, isCrossTrack = ?, " +
        "eventTypeId = ?, trackId = ?, agendaId = ?, conferenceId = ? WHERE  id = ?",
        json.title, json.description, json.venue, json.fromDateTime, json.toDateTime, json.isCrossTrack, json.eventTypeId, json.trackId, json.agendaId, json.conferenceId, json.id);
    db.commit();
    return result;
}

var deleteEvent = function (eventId) {
    var result = db.query("DELETE FROM tbl_event WHERE id = ?", eventId);
    db.commit();
    return result;
}

var getEventByEventId = function (eventId) {
    var result = db.query("SELECT * FROM tbl_event WHERE id = ?", eventId);
    return result;
}

var getEventByEventIdWithSpekers = function (eventId) {
    var result = db.query("SELECT * FROM tbl_event te JOIN tbl_speaker_event tse ON te.id = tse.eventId " +
        "JOIN tbl_speaker ts ON tse.speakerId = ts.id WHERE te.id = ?", eventId);
    return result;
}

var getAllEventByTrack = function (trackId) {
    var result = db.query("SELECT * FROM tbl_event WHERE trackId = ?", trackId);
    return result;
}

var getAllEventByEventTypeWithSpeakers = function (eventTypeId) {
    var result = db.query("SELECT * FROM tbl_event te JOIN tbl_speaker_event tse ON te.id = tse.eventId " +
        "JOIN tbl_speaker ts ON tse.speakerId = ts.id WHERE te.eventTypeId = ?", eventTypeId);
    return result;
}

var getAllEventByTrackWithEventTypesSpeakers = function (trackId) {
    var result = db.query("SELECT * FROM tbl_event te JOIN tbl_event_type tet ON te.eventTypeId = tet.id " +
        "JOIN tbl_speaker_event tse ON te.id = tse.eventId " +
        "JOIN tbl_speaker ts ON tse.speakerId = ts.id WHERE te.trackId = ?", trackId);
    return result;
}

var getAllEventBySpeakerWithEventType = function (speakerId) {
    var result = db.query("SELECT * FROM tbl_event te JOIN tbl_event_type tet ON te.eventTypeId = tet.id " +
        "JOIN tbl_speaker_event tse ON te.id = tse.eventId " +
        "JOIN tbl_speaker ts ON tse.speakerId = ts.id WHERE ts.id = ?", speakerId);
    return result;
}