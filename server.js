const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const config = require('./config.json');

mongoose.connect(`mongodb+srv://${config.mongoDBUser}:${config.mongoDBPassword}@${config.mongoCluserName}.mongodb.net/formative?retryWrites=true&w=majority`, {useNewUrlParser: true});


// Listen to port 3000
app.listen(port, () => {
    console.clear();
    console.log(`application is running on port ${port}`);
});
