require('dotenv-safe').config();
const jwt = require('jsonwebtoken');

const http = require('http');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const { default: next } = require('next');
app.use(bodyParser.json());

app.get('/',(req,res,next)=>{
    // const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // console.log('ip '+ip); // ip address of the user
    console.log('app.get / ');
    // res.json({message: 'root is working fine!! :)'});
    res.sendFile('C:/Users/jonat/OneDrive/CODING/myProjects/jwtauth/index.html');
})

app.get('/clients',verifyJWT,(req,res,next)=>{
    // const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // console.log('ip '+ip); // ip address of the user
    console.log('app.get /clients ');
    res.json([{id:1,name:'joao'},{id:2,name:'maria'}]);
})

app.post('/login', (req, res, next) => {
    console.log('/login started');
    //esse teste abaixo deve ser feito no seu banco de dados
    if(req.body.user === 'joao' && req.body.password === '123'){
      //auth ok
      console.log('authentication is ok!!')
      const id = 987654321; //esse id viria do banco de dados
      const token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 300 // expires in 5min
      });
      return res.json({ auth: true, token: token });
    }
    console.log('authentication failed!!')
    res.status(500).json({message: 'Login inválido!'});
})

function verifyJWT(req, res, next){
    console.log('verifyJWT start working');
    const token = req.headers['x-access-token'];
    console.log(token);
    if (!token) {
        console.log('no token provided');
        return res.status(401).json({ auth: false, message: 'No token provided' });}
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) {
            console.log('Failed to authenticate token');
            return res.status(500).json({ auth: false, message: 'Failed to authenticate token.'});
        }
        // se tudo estiver ok, salva no request para uso posterior
        console.log('token is ok, userId='+decoded.id);
        req.userId = decoded.id;
        next();
    });
}

const server = http.createServer(app);
server.listen(3000);
console.log('Server running on port 3000');