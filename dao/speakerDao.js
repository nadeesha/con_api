var log = new Log();

var db = require('/dao/db.js').db;

var createSpeaker = function (speaker) {
    var json = JSON.parse(speaker);
    var result = db.query("INSERT INTO tbl_speaker (name, designation, bio, bioMobile, photo, status) VALUES (?, ?, ?, ?, ?, ?)",
        json.name, json.designation, json.bio, json.bioMobile, json.photo, json.status);
    db.commit();
    return result;
}

var updateSpeaker = function (speaker) {
    var json = JSON.parse(speaker);
    var result = db.query("UPDATE tbl_speaker SET name = ?, designation = ?, bio = ?, bioMobile = ?, photo = ?, status = ? " +
        "WHERE id = ?", json.name, json.designation, json.bio, json.bioMobile, json.photo, json.status, json.id);
    db.commit();
    return result;
}

var getSpeakerBySpeakerId = function (speakerId) {
    var result = db.query("SELECT * FROM tbl_speaker WHERE id = ?", speakerId);
    return result;
}

var getAllSpeakers = function () {
    var result = db.query("SELECT * FROM tbl_speaker");
    return result;
}

var getAllActiveSpeakers = function () {
    var result = db.query("SELECT * FROM tbl_speaker WHERE status = 1");
    return result;
}

var getConferenceSpeakerWithEvent = function (speakerId, conferenceId) {
    var result = db.query("SELECT * FROM tbl_speaker ts JOIN tbl_speaker_event tse ON ts.id = tse.speakerId " +
        "JOIN tbl_event te ON tse.eventId  = te.id JOIN tbl_event_type tet ON te.eventTypeId = tet.id " +
        "WHERE ts.id = ? AND tse.conferenceId = ?", speakerId, conferenceId);
    return result;
}

var getAllConferenceSpeakersWithEvent = function (conferenceId) {
    var result = db.query("SELECT * FROM tbl_speaker ts JOIN tbl_speaker_event tse ON ts.id = tse.speakerId " +
        "JOIN tbl_event te ON tse.eventId  = te.id JOIN tbl_event_type tet ON te.eventTypeId = tet.id " +
        "WHERE tse.conferenceId = ?", conferenceId);
    return result;
}