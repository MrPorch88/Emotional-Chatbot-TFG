'use strict'
const dialogFlow = require('@google-cloud/dialogflow');
const config = require('../config/instances');
const {struct} = require('pb-util');
const mongoose = require('mongoose');
const projectID = config.googleProjectID;
const sessionID = config.dialogFlowSessionID;
const languageCode = config.dialogFlowSessionLanguageCode;
const credentials = {
    private_key: config.googlePrivate_key,
    client_email: config.googleClient_email
};

const sessionClient = new dialogFlow.SessionsClient({projectID, credentials});
//const sessionPath = sessionClient.projectAgentSessionPath(projectID, sessionID);
const Registration = mongoose.model('registration');

module.exports = {
    textQuery: async function(text, userID, parameters = {}) {
        try {
            let sessionPath = sessionClient.projectAgentSessionPath(projectID, sessionID + userID);
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

    eventQuery: async function(event, userID, parameters = {}) {
        try {
            let sessionPath = sessionClient.projectAgentSessionPath(projectID, sessionID + userID);
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
        let self = module.exports;
        let queryResult = responses[0].queryResult;

        switch (queryResult.action) {
            case 'highNegativeEmotion-yes':
                if (queryResult.allRequiredParamsPresent) {
                    self.saveRegistration(queryResult.parameters.fields);
                }
                break;
        } 
        return responses;
    },
    saveRegistration: async function(fields){
        const registration = new Registration({
            name: fields.name.structValue.fields.name.stringValue,
            country: fields.country.stringValue,
            email: fields.email.stringValue,
            description: fields.description.stringValue
        });
        try{
            let reg = await registration.save();
            console.log(reg);
        } catch (err){
            console.log(err);
        }
    }
}
