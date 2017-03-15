let test_data   = require('../data/test_data'),
    should      = require('should'),
    webSocket   = require('ws'),
    ws;

module.exports = {

    startWebSocket : function()
    {
        ws = new webSocket(
            'wss://echo.websocket.org',
            null,
            null);
    },

    closeWebSocket : function()
    {
        ws.close();
    },

    socketRequest : function(requestType)
    {
        ws.on('open', function () {
            let request_data = module.exports.getJsonObj(requestType, "request");

            ws.send(JSON.stringify(request_data));
        });
    },

    socketVerifyResponse : function(requestType, done)
    {
        ws.on('message', function(data) {
            let json = JSON.parse(data),
                exp_data = module.exports.getJsonObj(requestType, "response");

            should.deepEqual(json, exp_data);

            done();
        });

        ws.on('error', function (error) {
            should.fail(`Test failed due to websocket error: ${error}`)
        });
    },

    getJsonObj : function(requestType, requestOrResponse) {
        let type;
        switch (requestType)
        {
            case "example":
                type = test_data.example;
                break;
            default:
                should.fail("Function not implemented correctly for: " + requestType);
                type = test_data.example;
                break;
        }
        switch (requestOrResponse)
        {
            case "request":
                return type.request;
                break;
            case "response":
                return type.response;
                break;
            default:
                should.fail("Function not implemented correctly");
                return type;
                break;
        }
    }
};