const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const  profile  = require('./controllers/profile');
const  image  = require('./controllers/image');
const { database } = require('pg/lib/defaults');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 

const db = knex ({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: true
    }
  });
 
const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req,res) => { res.send('its working') })
app.post('/signin' , (req,res) => { signin.handleSignin(req,res,db,bcrypt)})
app.post('/register' , (req,res) => { register.handleRegister(req,res,db,bcrypt)})
app.post('/profile/:id' , (req,res) => { profile.handleProfileGet(req,res,db)})
app.put('/image' , (req,res) => { image.handleImage(req,res,db)})

app.listen(process.env.PORT || 3000, () =>{
    console.log(`app isssssss running in port ${process.env.PORT}`)
});