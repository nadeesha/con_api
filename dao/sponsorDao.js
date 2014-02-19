var log = new Log();

var db = require('/dao/db.js').db;

var createSponsor = function (sponsor) {
    var json = JSON.parse(sponsor);
    var result = db.query("INSERT INTO tbl_sponsor (name, logo, links, status) VALUES (?, ?, ?, ?)",
        json.name, json.logo, json.links, json.status);
    db.commit();
    return result;
}

var updateSponsor = function (sponsor) {
    var json = JSON.parse(sponsor);
    var result = db.query("UPDATE tbl_sponsor SET name = ?, logo = ?, links = ?, status = ? WHERE id = ?",
        json.name, json.logo, json.links, json.status, json.id);
    db.commit();
    return result;
}

var getSponsorBySponsorId = function (sponsorId) {
    var result = db.query("SELECT * FROM tbl_sponsor WHERE id = ?", sponsorId);
    return result;
}

var getAllSponsors = function () {
    var result = db.query("SELECT * FROM tbl_sponsor");
    return result;
}

var getAllActiveSponsors = function () {
    var result = db.query("SELECT * FROM tbl_sponsor WHERE status = 1");
    return result;
}

var getAllActiveSponsorsByConference = function (conferenceId) {
    var result = db.query("SELECT * FROM tbl_sponsor ts JOIN tbl_conference_sponsor tcs ON ts.id = tcs.sponsorId WHERE tcs.conferenceId = ? " +
        "AND tcs.status = 1", conferenceId);
    return result;
}