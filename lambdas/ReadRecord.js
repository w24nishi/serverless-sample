'use strict';

const aws = require('aws-sdk');
const docClient = new aws.DynamoDB.DocumentClient({region: 'ap-northeast-1'});
const accessControlHeader = {'Access-Control-Allow-Origin': process.env.ALLOW_ORIGIN};

exports.handler = async (event) => {
    const params = {
        TableName: process.env.TABLE_NAME,
        KeyConditionExpression : '#i = :val',
        ExpressionAttributeNames  : {
            '#i' : 'PostId'
        },
        ExpressionAttributeValues : {
            ':val' : +event.pathParameters.PostId
        }
    };
    let readResult;
    try {
        readResult = await docClient.query(params).promise();
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
        body: JSON.stringify(readResult)
    };
};

