var request = require('request'),
	should = require('should');

describe('default test suite',function () {
	it('GET /conferences', function  (done) {
		request.get('http://127.0.0.1:9763/con_api/conferences', function (err, res, body) {
			res.should.have.status(200);
			done();
		});
	});
});
