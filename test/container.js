let util = require('../support/websocket_utilities');


describe('Websocket Test Suite', function() {
    this.timeout(10000);


    before(function(done) {
        done();
    });


    beforeEach(function(done) {
        util.startWebSocket();
        done();
    });


    afterEach(function(done) {
        util.closeWebSocket();
        done();
    });


    after(function(done) {
        done();
    });


    it('example', function(done) {

        util.socketRequest('example', done);
        util.socketVerifyResponse('example', done)
    });
});