// Condicionales para distinguir entre entorno PRO en Heroku y local a la hora de escoger las credenciales
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./prodKeys');
} else {
    module.exports = require('./keys');
} 