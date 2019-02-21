'use strict';

const aws = require('aws-sdk');
const docClient = new aws.DynamoDB.DocumentClient({region: 'ap-northeast-1'});
const accessControlHeader = {'Access-Control-Allow-Origin': process.env.ALLOW_ORIGIN};

exports.handler = async (event) => {
    const reqBody = JSON.parse(event.body);
    const params = {
        TableName: process.env.TABLE_NAME,
        Key: {
            "PostId": +event.pathParameters.PostId
        },
        UpdateExpression: "set title = :t, content = :c",
        ExpressionAttributeValues: {
            ":t": reqBody.title,
            ":c": reqBody.content
        },
        ReturnValues: "UPDATED_NEW"
    };
    
    let updateResult;
    try {
        updateResult = await docClient.update(params).promise();
    } catch(e) {
        console.log(e);
        return {
            statusCode: 500,
            headers: accessControlHeader,
            body: 'NG'
        };
    }
    return {
        statusCode: 200,
        headers: accessControlHeader,
        body: JSON.stringify(updateResult)
    };
};

