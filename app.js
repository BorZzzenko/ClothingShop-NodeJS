const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const twig = require('twig');
require('dotenv/config');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Dir with img, css files
app.use(express.static(path.join(__dirname, "static")));

// Register twig
app.engine('html', twig.renderFile);
app.set('view engine', 'html');

// Views dir
app.set('views', __dirname + '/views');

// Import routes
const routes = require('./routes/routes');
app.use("/", routes);

// Conection to db
mongoose.connect(
    process.env.DB_CONNECTION_URL,
    {useNewUrlParser: true},
    () => console.log('Connected to MongoDB')
);

// Start listening app
const PORT = 3000;
app.listen(PORT, () =>
    console.log('App listening on port ' + PORT)
);