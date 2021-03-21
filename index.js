const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000; // Definimos el puerto para Heroku y local

app.get('/', (req, res)=>{
    res.send({'mensaje':'prueba'});
});

app.listen(PORT);


