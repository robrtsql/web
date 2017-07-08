'use strict';

const createResponse = (statusCode, body) => {
    return {
        statusCode: statusCode,
        body: JSON.stringify(body)
    }
};

exports.get = (event, context, callback) => {
    let response = [
        {name: "Memories", artist: "Leonard Cohen"},
        {name: "Young Americans", artist: "David Bowie"}
    ];
    callback(null, createResponse(200, response));
};
