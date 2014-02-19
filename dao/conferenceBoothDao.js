var log = new Log();

var db = require('/dao/db.js').db;

var createConferenceBooth = function (conferenceBooth) {
    var json = JSON.parse(conferenceBooth);
    var result = db.query("INSERT INTO tbl_conference_booth (conferenceId, boothId, status) VALUES (?, ?, ?)",
        json.conferenceId, json.boothId, json.status);
    db.commit();
    return result;
}

var updateConferenceSponsor = function (conferenceSponsor) {
    var json = JSON.parse(conferenceBooth);
    var result = db.query("UPDATE tbl_conference_booth SET boothId = ?, status = ? WHERE conferenceId = ?",
        json.boothId, json.status, json.conferenceId);
    db.commit();
    return result;
}

var getAllActiveConferencesWithBooths = function () {
    var result = db.query("SELECT * FROM tbl_conference tc JOIN tbl_conference_booth tcb ON tc.id = tcb.conferenceId " +
        "JOIN tbl_booth tb ON tcb.boothId = tb.id WHERE tcb.status = 1 AND tc.status = 1 AND tb.status = 1");
    return result;
}