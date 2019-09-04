const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');

const config = require('./config.json');

mongoose.connect(`mongodb+srv://${config.mongoDBUser}:${config.mongoDBPassword}@${config.mongoClusterName}.mongodb.net/formative?retryWrites=true&w=majority`, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected to mongo db');
});


app.use(function(req, res, next){
    console.log(`${req.method} request for ${req.url}`);
    next();
});

app.get('/', function(req, res){
    res.send('View class projects');
});

app.post('/users', function(req, res){
    User.findOne({ username: req.body.username }, function (err, checkUser) {
        if(checkUser){
            res.send('user already exists');
        } else {
            // const hash = bcrypt.hashSync(req.body.password);
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                username: req.body.username
                // email: req.body.email,
                // password: hash
            });
            // Save the user in the database
            user.save().then(result => {
                // send the result back to the front end.
                res.send(result);
            }).catch(err => res.send(err));
        }
    });
})

// Listen to port 3000
app.listen(port, () => {
    console.clear();
    console.log(`application is running on port ${port}`);
});
