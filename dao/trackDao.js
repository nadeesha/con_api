var log = new Log();

var db = require('/dao/db.js').db;

var createTrack = function (track) {
    var json = JSON.parse(track);
    var result = db.query("INSERT INTO tbl_track (name, agendaId, conferenceId) VALUES (?, ?, ?)",
        json.name, json.agendaId, json.conferenceId);
    db.commit();
    return result;
}

var updateTrack = function (track) {
    var json = JSON.parse(track);
    var result = db.query("UPDATE tbl_track SET name = ?, agendaId = ?, conferenceId = ? WHERE id = ?",
        json.name, json.agendaId, json.conferenceId, json.id);
    db.commit();
    return result;
}

var deleteTrack = function (trackId) {
    var result = db.query("DELETE FROM tbl_track WHERE id = ?", trackId);
    db.commit();
    return result;
}

var getTrackByTrackId = function (trackId) {
    var result = db.query("SELECT * FROM tbl_track WHERE id = ?", trackId);
    return result;
}

var getAllTracks = function () {
    var result = db.query("SELECT * FROM tbl_track");
    return result;
}

var getTrackByAgendaWithEventsSpeakers = function (trackId, agendaId) {
    var result = db.query("SELECT * FROM tbl_track tt JOIN tbl_event te ON tt.id = te.trackId " +
        "JOIN tbl_speaker_event tse ON te.id = tse.eventId JOIN tbl_speaker ts ON tse.speakerId = ts.id " +
        "WHERE tt.id = ? AND tt.agendaId = ?", trackId, agendaId);
    return result;
}

var getAllTracksByAgendaWithEventsSpeakers = function (agendaId) {
    var result = db.query("SELECT * FROM tbl_track tt JOIN tbl_event te ON tt.id = te.trackId " +
        "JOIN tbl_speaker_event tse ON te.id = tse.eventId JOIN tbl_speaker ts ON tse.speakerId = ts.id " +
        "WHERE tt.agendaId = ?", agendaId);
    return result;
}