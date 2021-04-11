'use strict'
const dialogFlow = require('@google-cloud/dialogflow');
const config = require('../config/instances');
const {struct} = require('pb-util');

const projectID = config.googleProjectID;
const sessionID = config.dialogFlowSessionID;
const languageCode = config.dialogFlowSessionLanguageCode;
const credentials = {
    private_key: config.googlePrivate_key,
    client_email: config.googleClient_email
};

const sessionClient = new dialogFlow.SessionsClient({projectID, credentials});
const sessionPath = sessionClient.projectAgentSessionPath(projectID, sessionID);

module.exports = {
    textQuery: async function(text, parameters = {}) {
        try {
            let self = module.exports;
            const request = {
                session: sessionPath,
                queryInput: {
                    text: {
                        // The query to send to the dialogflow agent
                        text: text,
                        // The language used by the client (en-US)
                        languageCode: languageCode,
                    },
                },
                queryParams: {
                    payload: {
                        data: parameters
                    }
                }
            };
            
            // Send request and log result
            // const responses = await sessionClient.detectIntent(request);
            // console.log('Detected intent');
            // const result = responses[0].queryResult;
            // console.log(`  Query: ${result.queryText}`);
            // console.log(`  Response: ${result.fulfillmentText}`);
            // if (result.intent) {
            //     console.log(`  Intent: ${result.intent.displayName}`);
            // } else {
            //     console.log(`  No intent matched.`);
            // }
            let responses = await sessionClient.detectIntent(request);
            responses = await self.handleAction(responses);
            return responses;

        } catch (error) {
            console.log(error);
        }
    },

    eventQuery: async function(event, parameters = {}) {
        try {
            let self = module.exports;
            const request = {
                session: sessionPath,
                queryInput: {
                    event: {
                        // The query to send to the dialogflow agent
                        name: event,
                        parameters: struct.encode(parameters),
                        // The language used by the client (en-US)
                        languageCode: languageCode,
                    },
                },
            };
            let responses = await sessionClient.detectIntent(request);
            responses = await self.handleAction(responses);
            return responses;

        } catch (error) {
            console.log(error);
        }
    },

    handleAction: function(responses){
        return responses;
    },

}