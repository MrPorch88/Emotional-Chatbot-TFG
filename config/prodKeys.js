module.exports = {
    googleProjectID: process.env.GOOGLE_PROJECT_ID,
    dialogFlowSessionID: process.env.DIALOG_FLOW_SESSION_ID,
    dialogFlowSessionLanguageCode: process.env.DIALOG_FLOW_SESSION_LANGUAGE_CODE,
    googlePrivate_key: JSON.parse(process.env.GOOGLE_PRIVATE_KEY),
    googleClient_email: process.env.GOOGLE_CLIENT_EMAIL,
    mongoURI: process.env.MONGO_URI
};