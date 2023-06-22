const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db');
const cors = require('./src/controllers/cors');

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cors());

app.use(require('./src/routes/index/index_routes'));
app.use(require('./src/routes/categorias/categorias_index'));
app.use(require('./src/routes/platos/platos-index'));
app.use(require('./src/routes/login/index-login'));

// Iniciar el servidor
app.listen(port);