require('dotenv-safe').config();
const jwt = require('jsonwebtoken');

const http = require('http');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const { default: next } = require('next');
app.use(bodyParser.json());

app.get('/',(req,res,next)=>{
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('ip '+ip); // ip address of the user
    console.log('app.get / ');
    res.json({message: 'root is working fine!! :)'});
})

app.get('/clients',(req,res,next)=>{
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('ip '+ip); // ip address of the user
    console.log('app.get /clients ');
    res.json([{id:1,name:'joao'},{id:2,name:'maria'}]);
})

const server = http.createServer(app);
server.listen(3000);
console.log('Server running on port 3000');