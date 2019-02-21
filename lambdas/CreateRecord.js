'use strict';

const aws = require('aws-sdk');
const docClient = new aws.DynamoDB.DocumentClient({region: 'ap-northeast-1'});
const accessControlHeader = {'Access-Control-Allow-Origin': process.env.ALLOW_ORIGIN};

exports.handler = async (event) => {
    const timestamp = new Date().getTime();
    const reqBody = JSON.parse(event.body);
    const params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            PostId: timestamp,
            title: reqBody.title,
            content: reqBody.content
        }
    };
    try {
        await docClient.put(params).promise();
    } catch(e) {
        console.log(e);
        return {
            statusCode: 500,
            headers: accessControlHeader,
            body: 'NG'
        };
    }
    return {
        statusCode: 201,
        headers: accessControlHeader,
        body: JSON.stringify({result: "created", postId: timestamp})
    };
};

