var log = new Log();

var db = require('/dao/db.js').db;

var createConference = function (conference){
    var json = JSON.parse(conference);
    var result = db.query("INSERT INTO tbl_conference (name, location, startDate, endDate, logo, status) " +
        "VALUES (?, ?, ?, ?, ?)",
        json.name, json.location, json.startDate, json.endDate, json.logo, status);
    db.commit();
    return result;
}

var updateConference = function (conference){
    var json = JSON.parse(conference);
    var result = db.query("UPDATE tbl_conference SET name = ?, location = ?, startDate = ?, endDate = ?, logo = ?, " +
        "status = ? WHERE id = ?",
        json.name, json.location, json.startDate, json.endDate, json.logo, json.status, json.id);
    db.commit();
    return result;
}

var getConferenceByConferenceId = function (conferenceId) {
    var result = db.query("SELECT * FROM tbl_conference WHERE id = ?", conferenceId);
    return result;
}

var getAllConferences = function () {
    var result = db.query("SELECT * FROM tbl_conference");
    return result;
}

var getAllActiveConferences = function () {
    var result = db.query("SELECT * FROM tbl_conference WHERE status = 1");
    return result;
}