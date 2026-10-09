const express = require('express');
const app = express();
app.use(express.json());

const rutasTickets = require('./src/routes/tickets');
app.use('/tickets', rutasTickets);

// Render asigna el puerto por variable de entorno, esta línea es OBLIGATORIA
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Servidor activo en el puerto ' + PORT));