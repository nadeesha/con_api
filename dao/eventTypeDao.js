var log = new Log();

var db = require('/dao/db.js').db;

var createEventType = function (eventType) {
    var json = JSON.parse(eventType);
    var result = db.query("INSERT INTO tbl_event_type (name, status) VALUES (?, ?)",
        json.name, json.status);
    db.commit();
    return result;
}

var updateEventType = function (eventType) {
    var json = JSON.parse(eventType);
    var result = db.query("UPDATE tbl_event_type SET name = ?, status = ? WHERE id =  ?",
        json.name, json.status, json.id);
    db.commit();
    return result;
}

var getEventTypeByEventTypeId = function (eventTypeId) {
    var result = db.query("SELECT * FROM tbl_event_type WHERE id = ?", eventTypeId);
    return result;
}

var getAllEvents = function () {
    var result = db.query("SELECT * FROM tbl_event_type");
    return result;
}

var getAllActiveEvents = function () {
    var result = db.query("SELECT * FROM tbl_event_type WHERE status = 1");
    return result;
}