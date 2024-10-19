const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const notificacionesRouter = require('./routes/notificaciones');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/notificaciones', notificacionesRouter);

app.get('/', (req, res) => {
    res.send('¡API en funcionamiento!');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});