const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('morgan');
const actionModel = require('./data/helpers/actionModel');
const projectModel = require('./data/helpers/projectModel');

//Instatiates a server object
const server = express();

//Third party middleware
//express.json returns json objects of the response
//All global middlewares that will be used across enpoints must also be plugged into the server
//cors and helmet middlewares are not used
server.use(express.json(), logger('combined'), cors(), helmet());

//Root Request/Route Handler
server.get('/', (req, res) => {
    res.send('Test for root route')
});



//Project Request/Route Handlers

server.get('/projects', (req, res, next) => {
    projectModel.get()
      .then(projects => {
        res.status(200).json(projects)
      })
      .catch(err => {
        res.status(500).json(`${err}: Information not available`);
      })
   
   });














//Port & Port Listner
const port = 7000 
server.listen(port, () => console.log(`\n Listening on on port ${port} `   ))