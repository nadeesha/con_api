var log = new Log();

var db = require('/dao/db.js').db;

var createBooth = function (booth) {
    var json = JSON.parse(booth);
    var result = db.query("INSERT INTO tbl_booth (name, logo, links, status) VALUES (?, ?, ?, ?)",
        json.name, json.logo, json.links, json.status);
    db.commit();
    return result;
}

var updateBooth = function (booth) {
    var json = JSON.parse(booth);
    var result = db.query("UPDATE tbl_booth SET name = ?, logo = ?, links = ?, status = ? WHERE id = ?)",
        json.name, json.logo, json.links, json.status, json.id);
    db.commit();
    return result;
}

var getBoothByBoothId = function (boothId) {
    var result = db.query("SELECT * FROM tbl_booth WHERE id = ?", boothId);
    return result;
}

var getAllBooths = function () {
    var result = db.query("SELECT * FROM tbl_booth");
    return result;
}

var getAllActiveBooths = function () {
    var result = db.query("SELECT * FROM tbl_booth WHERE status = 1");
    return result;
}

var getAllActiveBoothByConference = function (conferenceId) {
    var result = db.query("SELECT * FROM tbl_booth tb JOIN tbl_conference_booth tcb ON tb.id = tcb.boothId WHERE tcb.conferenceId = ? " +
        "AND tcb.status = 1", conferenceId);
    return result;
}