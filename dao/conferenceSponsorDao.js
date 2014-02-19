var log = new Log();

var db = require('/dao/db.js').db;

var createConferenceSponsor = function (conferenceSponsor) {
    var json = JSON.parse(conferenceSponsor);
    var result = db.query("INSERT INTO tbl_conference_sponsor (conferenceId, sponsorId, status) VALUES (?, ?, ?)",
        json.conferenceId, json.sponsorId, json.status);
    db.commit();
    return result;
}

var updateConferenceSponsor = function (conferenceSponsor) {
    var json = JSON.parse(conferenceSponsor);
    var result = db.query("UPDATE tbl_conference_sponsor SET sponsorId = ?, status = ? WHERE conferenceId = ?",
        json.sponsorId, json.status, json.conferenceId);
    db.commit();
    return result;
}

var getAllActiveConferencesWithSponsors = function () {
    var result = db.query("SELECT * FROM tbl_conference tc JOIN tbl_conference_sponsor tcs ON tc.id = tcs.conferenceId " +
        "JOIN tbl_sponsor ts ON tcs.sponsorId =  ts.id WHERE tcs.status = 1 AND tc.status = 1 " +
        "AND ts.status = 1");
    return result;
}