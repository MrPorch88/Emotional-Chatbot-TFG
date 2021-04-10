const dialogFlow = require('@google-cloud/dialogflow');
const config = require('../config/keys');


const projectID = config.googleProjectID;
const sessionID = config.dialogFlowSessionID;
const languageCode = config.dialogFlowSessionLanguageCode;
const credentials = {
    private_key: config.googlePrivate_key,
    client_email: config.googleClient_email
};

const sessionClient = new dialogFlow.SessionsClient({projectID, credentials});

const sessionPath = sessionClient.projectAgentSessionPath(projectID, sessionID);

module.exports = app => {

    app.get('/', (req, res)=>{
        res.send({'mensaje':'prueba nodemon'});
    });

    app.post('/api/df_text_query', async (req, res)=>{
        try {
            const request = {
                session: sessionPath,
                queryInput: {
                  text: {
                    // The query to send to the dialogflow agent
                    text: req.body.text,
                    // The language used by the client (en-US)
                    languageCode: languageCode,
                  },
                },
              };
            
             // Send request and log result
            const responses = await sessionClient.detectIntent(request);
            console.log('Detected intent');
            const result = responses[0].queryResult;
            console.log(`  Query: ${result.queryText}`);
            console.log(`  Response: ${result.fulfillmentText}`);
            if (result.intent) {
                console.log(`  Intent: ${result.intent.displayName}`);
            } else {
                console.log(`  No intent matched.`);
            }
            
            res.send(responses[0].queryResult);
        } catch (err) {
            console.log(err);
        }
        
    });

    app.post('/api/df_event_query', (req, res)=>{
        res.send({'do':'event query'});
    });
}