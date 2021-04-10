const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000; // Definimos el puerto para Heroku y local
app.use(express.json());
require('./routes/dialogFlowRoutes')(app);


app.listen(PORT);


