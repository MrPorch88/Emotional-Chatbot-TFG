const express = require('express');
const app = express();

app.get('/', (req, res)=>{
    res.send({'mensaje':'prueba'});
});

app.listen(5000);


