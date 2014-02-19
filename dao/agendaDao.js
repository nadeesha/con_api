var log = new Log();

var db = require('/dao/db.js').db;

var createAgenda = function (agenda) {
    var json = JSON.parse(agenda);
    var result = db.query("INSERT INTO tbl_agenda (name, date, conferenceId) VALUES (?, ?, ?)",
        json.name, json.date, json.conferenceId);
    db.commit();
    return result;
}

var updateAgenda = function (agenda) {
    var json = JSON.parse(agenda);
    var result = db.query("UPDATE tbl_agenda SET name = ?, date = ?, conferenceId = ? WHERE id = ?",
        json.name, json.date, json.conferenceId, json.id);
    db.commit();
    return result;
}

var deleteAgenda = function (agendaId) {
    var json = JSON.parse(agenda);
    var result = db.query("DELETE FROM tbl_agenda WHERE id = ?", agendaId);
    db.commit();
    return result;
}

var getAgendaByAgendaId = function (agendaId) {
    var result = db.query("SELECT * FROM tbl_agenda WHERE id = ?", agendaId);
    return result;
}

var getAllAgendaByConference = function (conferenceId) {
    var result = db.query("SELECT * FROM tbl_agenda WHERE conferenceId = ?", conferenceId);
    return result;
}

var getAgendaByConferenceWithTracksEventsSpeakers = function (agendaId, conferenceId) {
    var result = db.query("SELECT * FROM tbl_agenda ta JOIN tbl_track tt ON ta.id = tt.agendaId " +
        "JOIN tbl_event te ON tt.id = te.trackId JOIN tbl_speaker_event tse ON te.id = tse.eventId " +
        "JOIN tbl_speaker ts ON tse.id = ts.speakerId WHERE ta.id = ? AND ta.conferenceId = ?", agendaId, conferenceId);
    return result;
}

var getAllAgendaByConferenceWithTracksEventsSpeakers = function (conferenceId) {
    var result = db.query("SELECT * FROM tbl_agenda ta JOIN tbl_track tt ON ta.id = tt.agendaId " +
        "JOIN tbl_event te ON tt.id = te.trackId JOIN tbl_speaker_event tse ON te.id = tse.eventId " +
        "JOIN tbl_speaker ts ON tse.id = ts.speakerId WHERE ta.conferenceId = ?", conferenceId);
    return result;
}