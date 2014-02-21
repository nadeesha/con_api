var log = new Log();

var boothDao = require('/dao/boothDao.js');

var postBooth = function (req, res) {
    var booth = JSON.parse(req.getContent());
    if (!booth.name || !booth.links) {
        res.status = 400;
        res.contentType = 'application/json';
        res.content = {
            message: 'Booth should contain name and status'
        };
    } else {
        booth.status = 1;
        var result = boothDao.createBooth(booth);
        res.status = 200;
    }
}

var putBooth = function (req, res) {
    var booth = JSON.parse(req.getContent());
    if (!booth.name || !booth.links) {
        res.status = 400;
        res.contentType = 'application/json';
        res.content = {
            message: 'Booth should contain id, name and status'
        };
    } else {
        booth.status = booth.status || 1;
        var result = boothDao.updateBooth(booth, Number(req._params.id));
        res.status = 200;
    }
}

var getBooth = function (req, res) {
    var boothId = req._params.id;
    if (boothId) {
        var result = boothDao.getBoothByBoothId(Number(boothId));

        if (result) {
            res.status = 200;
            res.contentType = 'application/json';
            res.content = result;
        } else {
            res.status = 400;
            res.contentType = 'application/json';
            res.content = {
                message: 'Booth data not found'
            };
        }
    }
}

var getAllBooths = function (req, res) {
    var result = boothDao.getAllBooths();
    res.status = 200;
    res.contentType = "application/json";
    res.content = result;
}

var getAllActiveBooths = function (req, res) {
    var status = req._params.status;
    if (status && status === '1') {

        var result = boothDao.getAllActiveBooths();
        if (result) {
            res.status = 200;
            res.contentType = "application/json";
            res.content = result;
        } else {
            res.status = 400;
            res.contentType = 'application/json';
            res.content = {
                message: 'Active Booth data not found'
            };
        }
    }
}

var getAllActiveBoothByConference = function (req, res) {
    var confId = req._params.confId;
    if (confId) {
        var result = boothDao.getAllActiveBoothByConference(Number(confId));

        if (result) {
            res.status = 200;
            res.contentType = "application/json";
            res.content = result;
        } else {
            res.status = 400;
            res.contentType = 'application/json';
            res.content = {
                message: 'Booth data not found for given conference'
            };
        }
    }
}