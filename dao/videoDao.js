var log = new Log();

var db = require('/dao/db.js').db;

var createVideo = function (video) {
    var json = JSON.parse(video);
    var result = db.query("INSERT INTO tbl_video (link, status, conferenceId) VALUES (?, ?, ?)",
        json.link, json.status, json.conferenceId);
    db.commit();
    return result;
}

var updateVideo = function (video) {
    var json = JSON.parse(video);
    var result = db.query("UPDATE tbl_video SET link = ?, status = ?, conferenceId = ? WHERE id = ?",
        json.link, json.status, json.conferenceId, json.id);
    db.commit();
    return result;
}

var getVideoByVideoId = function (videoId) {
    var result = db.query("SELECT * FROM tbl_video WHERE id = ?", videoId);
    return result;
}

var getAllVideos = function () {
    var result = db.query("SELECT * FROM tbl_video");
    return result;
}

var getActiveAllVideos = function () {
    var result = db.query("SELECT * FROM tbl_video WHERE status = 1");
    return result;
}

var getAllActiveVideosByConference = function (conferenceId) {
    var result = db.query("SELECT * FROM tbl_video WHERE conferenceId = ? AND status = 1", conferenceId);
    return result;
}