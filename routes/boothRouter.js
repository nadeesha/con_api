var log = new Log();

var boothDao = require('/dao/boothDao.js');

var postBooth = function(req,res, session){
    var booth = req.getContent();
    if (typeof booth != 'object') {
        res.status = 400;
    } else {
        if(!booth.name || !booth.status) {
            res.status = 400;
            res.contentType = 'application/json';
            res.content = {
                message: 'Booth should contain name and status'
            };
        } else {
            var result = boothDao.createBooth(booth);
            re
        }
    }
}

var postBooth = function(req,res, session){
    var booth = req.getContent();
    if (typeof booth != 'object') {
        res.status = 400;
    } else {
        if(!booth.id || !booth.name || !booth.status) {
            res.status = 400;
            res.contentType = 'application/json';
            res.content = {
                message: 'Booth should contain id, name and status'
            };
        }
    }
}

var getBoothByBoothId = function(req,res, session){
    var boothId = req._params.id;
    if(boothId != null){

    }
}

var getAllBooths = function(req,res, session){

}

var getAllActiveBooths = function(req,res, session){

}

var getAllActiveBoothByConference = function(req,res, session){

}