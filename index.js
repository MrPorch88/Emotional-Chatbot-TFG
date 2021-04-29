const express = require('express');

const app = express();
const config = require('./config/keys');
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, { useNewUrlParse: true });

require('./models/Registration');
const PORT = process.env.PORT || 5000; // Definimos el puerto para Heroku y local
app.use(express.json()); // Middleware para el parseo de la informacion
require('./routes/dialogFlowRoutes')(app);

if (process.env.NODE_ENV === 'production') { // Comprobacion para deploy en Heroku
    // Build de archivos js y para el css
    app.use(express.static('client/build'));

    // Routing de direcciones
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}



app.listen(PORT);


