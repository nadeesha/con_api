var log = new Log();

var sponsorDao = require('/dao/sponsorDao.js');

var postSponsor = function(req,res, session){
    var sponsor = req.getContent();
    if (typeof sponsor != 'object') {
        res.status = 400;
    } else {
        if (!sponsor.name || !sponsor.status) {
            res.status = 400;
            res.contentType = 'application/json';
            res.content = {
                message: 'Sponsor should contain name and status'
            };
        } else {
            var result = sponsorDao.createSponsor(sponsor);
            res.status=200;
            res.contentType = 'application/json';
            res.content = result;
        }
    }
}

var putSponsor = function(req,res, session){
    var sponsor = req.getContent();
    if (typeof sponsor != 'object') {
        res.status = 400;
    } else {
        if (!sponsor.id || !sponsor.name || !sponsor.status) {
            res.status = 400;
            res.contentType = 'application/json';
            res.content = {
                message: 'Sponsor should contain id, name and status'
            };
        } else {
            var result = sponsorDao.updateSponsor(sponsor);
            res.status=200;
            res.contentType = 'application/json';
            res.content = result;
        }
    }
}

var getSponsor = function(req,res, session){
    var sponsorId = req._params.id;
    if(sponsorId != null){
        var result = sponsorDao.getSponsorBySponsorId(sponsorId);
        if(result != null) {
            res.status = 200;
            res.contentType = 'application/json';
            res.content = result;
        } else {
            res.status = 400;
            res.contentType = 'application/json';
            res.content = {
                message: 'Sponsor data not found'
            };
        }
    }
}

var getAllSponsors = function(req,res, session){
    res.status = 200;
    res.contentType = 'application/json';
    res.content = sponsorDao.getAllSponsors();
}

var getAllActiveSponsors = function(req,res, session){
    var status = req._params.status;
    if(status != null && status == 1){
        res.status = 200;
        res.contentType = 'application/json';
        res.content = sponsorDao.getAllActiveSponsors();
    } else {
        res.status = 400;
        res.contentType = 'application/json';
        res.content = {
            message: 'Active Sponsor data not found'
        };
    }
}

var getAllActiveSponsorsByConference = function(req,res, session){
    var confId = req._params.confId;
    if(confId != null){
        var result = sponsorDao.getAllActiveSponsorsByConference(confId);
        if(result != null){
            res.status = 200;
            res.contentType = 'application/json';
            res.content = result;
        } else {
            res.status = 400;
            res.contentType = 'application/json';
            res.content = {
                message: 'Sponsor data not found for given conference'
            };
        }
    }
}
