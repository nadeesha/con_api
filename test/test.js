var request = require('request'),
    should = require('should');

describe('default test suite',function () {
    it('GET /conferences', function  (done) {
        request.get('http://127.0.0.1:9770/con_api/conferences', function (err, res, body) {
            res.should.have.status(200);
            done();
        });
    });
});

describe('default test suite',function () {
    it('GET /conferences/', function  (done) {
        request.get('http://127.0.0.1:9770/con_api/conferences/status/1', function (err, res, body) {
            res.should.have.status(200);
            done();
        });
    });
});

describe('default test suite',function () {
    it('GET /conferences/', function  (done) {
        request.get('http://127.0.0.1:9770/con_api/conferences/1/sponsors', function (err, res, body) {
            res.should.have.status(200);
            done();
        });
    });
});

describe('default test suite',function () {
    it('GET /conferences/', function  (done) {
        request.get('http://127.0.0.1:9770/con_api/conferences/1/booths', function (err, res, body) {
            res.should.have.status(200);
            done();
        });
    });
});

describe('default test suite',function () {
    it('GET /sponsors/', function  (done) {
        request.get('http://127.0.0.1:9770/con_api/sponsors', function (err, res, body) {
            res.should.have.status(200);
            done();
        });
    });
});

describe('default test suite',function () {
    it('GET /sponsors/', function  (done) {
        request.get('http://127.0.0.1:9770/con_api/sponsors/1', function (err, res, body) {
            res.should.have.status(200);
            done();
        });
    });
});

describe('default test suite',function () {
    it('GET /sponsors/', function  (done) {
        request.get('http://127.0.0.1:9770/con_api/sponsors/status/1', function (err, res, body) {
            res.should.have.status(200);
            done();
        });
    });
});

describe('default test suite',function () {
    it('GET /booths/', function  (done) {
        request.get('http://127.0.0.1:9770/con_api/booths', function (err, res, body) {
            res.should.have.status(200);
            done();
        });
    });
});

describe('default test suite',function () {
    it('GET /booths/', function  (done) {
        request.get('http://127.0.0.1:9770/con_api/booths/1', function (err, res, body) {
            res.should.have.status(200);
            done();
        });
    });
});

describe('default test suite',function () {
    it('GET /booths/', function  (done) {
        request.get('http://127.0.0.1:9770/con_api/booths/status/1', function (err, res, body) {
            res.should.have.status(200);
            done();
        });
    });
});

describe('default test suite',function () {
    it('GET /conferenceSponsor/', function  (done) {
        request.get('http://127.0.0.1:9770/con_api/conferenceSponsor', function (err, res, body) {
            res.should.have.status(200);
            done();
        });
    });
});


describe('default test suite',function () {
    it('GET /conferenceBooth/', function  (done) {
        request.get('http://127.0.0.1:9770/con_api/conferenceBooth', function (err, res, body) {
            res.should.have.status(200);
            done();
        });
    });
});

describe('default test suite',function () {
    it('GET /eventTypes/', function  (done) {
        request.get('http://127.0.0.1:9770/con_api/eventTypes', function (err, res, body) {
            res.should.have.status(200);
            done();
        });
    });
});

describe('default test suite',function () {
    it('GET /eventTypes/', function  (done) {
        request.get('http://127.0.0.1:9770/con_api/eventTypes/1', function (err, res, body) {
            res.should.have.status(200);
            done();
        });
    });
});

describe('default test suite',function () {
    it('GET /eventTypes/', function  (done) {
        request.get('http://127.0.0.1:9770/con_api/eventTypes/status/1', function (err, res, body) {
            res.should.have.status(200);
            done();
        });
    });
});

