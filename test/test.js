var request = require('request'),
    should = require('should');
//conference tests
describe('default test suite',function () {
    it('GET /conferences', function  (done) {
        request.get('http://127.0.0.1:9770/con_api/conferences', function (err, res, body) {
            res.should.have.status(200);
            done();
        });
    });
});

describe('default test suite',function () {
    it('GET /conferences', function  (done) {
        request.get('http://127.0.0.1:9770/con_api/conferences/1', function (err, res, body) {
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
    it('GET /conferences/', function  (done) {
        request.get('http://127.0.0.1:9770/con_api/conferences/1/videos', function (err, res, body) {
            res.should.have.status(200);
            done();
        });
    });
});

//sponsor test
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

//booths test
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

//speakers test
describe('default test suite',function () {
    it('GET /speakers/', function  (done) {
        request.get('http://127.0.0.1:9770/con_api/speakers', function (err, res, body) {
            res.should.have.status(200);
            done();
        });
    });
});

describe('default test suite',function () {
    it('GET /speakers/', function  (done) {
        request.get('http://127.0.0.1:9770/con_api/speakers/1', function (err, res, body) {
            res.should.have.status(200);
            done();
        });
    });
});

describe('default test suite',function () {
    it('GET /speakers/', function  (done) {
        request.get('http://127.0.0.1:9770/con_api/speakers/1/events', function (err, res, body) {
            res.should.have.status(200);
            done();
        });
    });
});

//event types
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

//videos test
describe('default test suite',function () {
    it('GET /videos/', function  (done) {
        request.get('http://127.0.0.1:9770/con_api/videos', function (err, res, body) {
            res.should.have.status(200);
            done();
        });
    });
});

describe('default test suite',function () {
    it('GET /videos/', function  (done) {
        request.get('http://127.0.0.1:9770/con_api/videos/1', function (err, res, body) {
            res.should.have.status(200);
            done();
        });
    });
});

describe('default test suite',function () {
    it('GET /videos/', function  (done) {
        request.get('http://127.0.0.1:9770/con_api/videos/status/1', function (err, res, body) {
            res.should.have.status(200);
            done();
        });
    });
});

//agendas test
describe('default test suite',function () {
    it('GET /agendas/', function  (done) {
        request.get('http://127.0.0.1:9770/con_api/conferences/1/agendas/1', function (err, res, body) {
            res.should.have.status(200);
            done();
        });
    });
});

describe('default test suite',function () {
    it('GET /agendas/', function  (done) {
        request.get('http://127.0.0.1:9770/con_api/conferences/1/agendas/1', function (err, res, body) {
            res.should.have.status(200);
            done();
        });
    });
});

//tracks tests
describe('default test suite',function () {
    it('GET /conferences/', function  (done) {
        request.get('http://127.0.0.1:9770/con_api/conferences/1/agendas/1/tracks/1', function (err, res, body) {
            res.should.have.status(200);
            done();
        });
    });
});

describe('default test suite',function () {
    it('GET /conferences/', function  (done) {
        request.get('http://127.0.0.1:9770/con_api/conferences/1/agendas/1/tracks', function (err, res, body) {
            res.should.have.status(200);
            done();
        });
    });
});

//events test
describe('default test suite',function () {
    it('GET /conferences/', function  (done) {
        request.get('http://127.0.0.1:9770/con_api/events', function (err, res, body) {
            res.should.have.status(200);
            done();
        });
    });
});

describe('default test suite',function () {
    it('GET /conferences/', function  (done) {
        request.get('http://127.0.0.1:9770/con_api/conferences/1/agendas/1/tracks/1/events/1', function (err, res, body) {
            res.should.have.status(200);
            done();
        });
    });
});

describe('default test suite',function () {
    it('GET /conferences/', function  (done) {
        request.get('http://127.0.0.1:9770/con_api/conferences/1/agendas/1/tracks/1/events', function (err, res, body) {
            res.should.have.status(200);
            done();
        });
    });
});

