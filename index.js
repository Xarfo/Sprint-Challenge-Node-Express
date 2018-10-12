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

//Project Routes

//Project Request/Route Handlers Get
server.get('/projects', (req, res) => {
    projectModel.get()
      .then(projects => {
        res.status(200).json(projects)
      })
      .catch(err => {
        res.status(500).json(`${err}: Information not available`);
      });
   
   });

//Project Request/Route Handlers Get By Id
server.get('/projects/:id', (req, res) => {
    projectModel.getProjectActions(req.params.id)
      .then(actions => {
        res.status(200).json(actions);
      })
      .catch(err => {
        res.status(500).json(err);
      });
   });

//Project Request/Route Handlers Create Operation
server.post('/projects', (req, res, next) => {
    const { name, description, completed } = req.body;
    const newProject = { name, description, completed };
    projectModel.insert(newProject)
      .then(
        res.status(200).json(newProject)
      )
      .catch(err => {
        console.error(err);
      })
   })













//Port & Port Listner
const port = 7000 
server.listen(port, () => console.log(`\n Listening on on port ${port} `   ))