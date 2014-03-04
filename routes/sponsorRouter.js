/* jshint indent: false */

'use strict';

var sponsorDao = require('/dao/sponsorDao.js');

var postSponsor = function(req,res){
    var sponsor = (req.getContent());

        if (!sponsor.name || !sponsor.logo || !sponsor.links) {
            res.status = 400;
            res.contentType = 'application/json';
            res.content = {
                message: 'Sponsor should contain name and status'
            };
        } else {
            sponsorDao.createSponsor(sponsor);
            res.status=200;
        }
}

var putSponsor = function(req,res){
    var sponsor = (req.getContent());

        if (!sponsor.name || !sponsor.logo || !sponsor.links) {
            res.status = 400;
            res.contentType = 'application/json';
            res.content = {
                message: 'Sponsor should contain id, name and status'
            };
        } else {
            sponsor.status = sponsor.status || 1;
            sponsorDao.updateSponsor(sponsor, Number(req._params.id));
            res.status=200;
        }
}

var getSponsor = function(req,res){
    var sponsorId = req._params.id;
    if(sponsorId){
        var result = sponsorDao.getSponsorBySponsorId(Number(sponsorId));

        if(result) {
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

var getAllSponsors = function(req,res){
    res.status = 200;
    res.contentType = 'application/json';
    res.content = sponsorDao.getAllSponsors();
}

var getAllActiveSponsors = function (req, res, session) {
    var status = req._params.status;
    if (status && status === '1') {
        var result = sponsorDao.getAllActiveSponsors();

        if (result) {
            res.status = 200;
            res.contentType = 'application/json';
            res.content = result;
        } else {
            res.status = 400;
            res.contentType = 'application/json';
            res.content = {
                message: 'Active Sponsor data not found'
            };
        }
    }
}

var getAllActiveSponsorsByConference = function(req,res){
    var confId = req._params.confId;
    if(confId){
        var result = sponsorDao.getAllActiveSponsorsByConference(Number(confId));

        if(result){
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
