const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const saltRounds = 10;


const register = require('./controllers/Register');
const signin = require('./controllers/Signin');
const profile = require('./controllers/Profile');
const image = require('./controllers/Image');


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : 'Post1900!',
    database : 'facerecognition'
  }
});

console.log(db.select('*').from('users'));


const app = express();
app.use(cors());
app.use(bodyParser.json());


app.get('/', (req,res) => {res.send(db.users)})

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)});

app.put('/image', (req, res) => {image.handleImagePut(req, res, db)})
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt, saltRounds)})

app.listen(process.env.PORT || 3000, () => {
	console.log('our app is running');
})

