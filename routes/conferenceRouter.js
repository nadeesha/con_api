var log = new Log();

var conferenceDao = require('/dao/conferenceDao.js');

var postConference = function(req,res, session){
    var conference = req.getContent();
    if (typeof conference != 'object') {
        res.status = 400;
    } else {
        if (!conference.name || !conference.location || !conference.startDate || !conference.endDate || !conference.status) {
            res.status = 400;
            res.contentType = 'application/json';
            res.content = {
                message: 'Conference should contain name, location, start date, end date and status'
            };
        } else {
            var result = conferenceDao.createConference(conference);
            res.status=200;
            res.contentType = 'application/json';
            res.content = result;
        }
    }
}

var putConference = function(req,res, session){
    var conference = req.getContent();
    if (typeof conference != 'object') {
        res.status = 400;
    } else {
        if (!conference.id || !conference.name || !conference.location || !conference.startDate || !conference.endDate || !conference.status) {
            res.status = 400;
            res.contentType = 'application/json';
            res.content = {
                message: 'Conference should contain id, name, location, start date, end date and status'
            };
        } else {
            var result = conferenceDao.updateConference(conference);
            res.status=200;
            res.contentType = 'application/json';
            res.content = result;
        }
    }
}

var getConference = function(req,res, session){
    var conferenceId = req._params.id;
    if(conferenceId != null){
        var result = conferenceDao.getConferenceByConferenceId(conferenceId);
        if(result != null) {
            res.status = 200;
            res.contentType = 'application/json';
            res.content = result;
        } else {
            res.status = 400;
            res.contentType = 'application/json';
            res.content = {
                message: 'Conference data not found'
            };
        }
    }
}

var getAllConferences = function(req,res,session){
    res.status = 200;
    res.contentType = 'application/json';
    res.content = conferenceDao.getAllConferences();
};

var getActiveConferences = function(req,res,session){
    var status = req._params.status;
    if(status != null && status == 1){
        var result = conferenceDao.getAllActiveConferences();
        if(result != null){
            res.status = 200;
            res.contentType = 'application/json';
            res.content = conferenceDao.getAllActiveConferences();
        } else {
            res.status = 400;
            res.contentType = 'application/json';
            res.content = {
                message: 'Active conference data not found'
            };
        }
    }
}
