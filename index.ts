import { APIGatewayProxyEvent, APIGatewayProxyResultV2, Handler } from "aws-lambda";
import * as _ from 'lodash';
import * as AWS from 'aws-sdk';
import { Knex } from 'knex';
// AWS.config.update({region: 'us-east-1'});

const host = 'welldb.cmrswdjikbhu.us-east-1.rds.amazonaws.com';
const user = 'admin';
const password = 'wellplayed';
const port = 3306;
const database = 'dbo';

const connection = {
    ssl: { rejectUnauthorized: false },
    host,
    port,
    user,
    password,
    database
}

const knex = require('knex')({
    client: 'mysql',
    connection
  });


export const handler: Handler = async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResultV2> => {   
    try {
        console.log('event', event.httpMethod);
        // await knex('User').select('UserId');
        let user = await knex.select('*').from('User');
        const response = {
            statusCode: 200,
            body: JSON.stringify(user)
        };
        return response;
    } 
    catch(err) {
        return {
            statusCode: 500,
            body: err
        }
    }
};