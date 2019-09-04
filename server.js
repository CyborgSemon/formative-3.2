const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./config.json');

const User = require('./models/users');

const Item = require('./models/items');

mongoose.connect(`mongodb+srv://${config.mongoDBUser}:${config.mongoDBPassword}@${config.mongoClusterName}.mongodb.net/formative?retryWrites=true&w=majority`, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected to mongo db');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(cors());


app.use(function(req, res, next){
    console.log(`${req.method} request for ${req.url}`);
    next();
});

app.get('/', function(req, res){
    res.send('View class projects');
});

// CREATE: Create / register users and post them to MongoDB
app.post('/users', function(req, res) {
    User.findOne({ username: req.body.username }, function (err, checkUser) {
        if(checkUser){
            res.send('user already exists');
        } else {
            const hash = bcrypt.hashSync(req.body.password);
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                username: req.body.username,
                password: hash,
                fullName: req.body.fullName,
                email: req.body.email
            });
            // Save user in database
            user.save().then(result => {
                res.send(result);
            }).catch(err => res.send(err));
        }
    });
});

// READ: Gets an array of all users
app.get('/allUsers', function(req, res){
    User.find().then(result => {
        res.send(result);
    });
});

// CREATE: Add new item
app.post('/item', function(req, res){
    const item = new Item({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        author: req.body.author,
        url: req.body.url,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
        user_id: req.body.userId
    });

    product.save().then(result => {
        res.send(result);
    }).catch(err => res.send(err));
});

// READ: Get all items
app.get('/allItems', function(req, res){
    Item.find().then(result => {
        res.send(result);
    });
});

// Listen to port 3000
app.listen(port, () => {
    console.clear();
    console.log(`application is running on port ${port}`);
});
