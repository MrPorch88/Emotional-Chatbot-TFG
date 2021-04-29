const mongoose = require('mongoose');
const { Schema } = mongoose;

const registrationSchema = new Schema({
    name: String,
    country: String,
    email: String,
    description: String
});

mongoose.model('registration', registrationSchema);