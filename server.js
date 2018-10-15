const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('morgan');
const actionModel = require('./data/helpers/actionModel');
const projectModel = require('./data/helpers/projectModel');

//Instatiates a server(app) object
const app = express();

//Third party middleware
//express.json returns json objects of the response
//All global middlewares that will be used across enpoints must also be plugged into the app
//cors and helmet middlewares are not used
app.use(express.json(), logger('combined'), cors(), helmet());

//Root Request/Route Handler
app.get('/', (req, res) => {
    res.send('Test for root route')
});

//Project Routes

//Project Endpoint for Get
app.get('/projects', (req, res) => {
    projectModel.get()
      .then(projects => {
        res.status(200).json(projects)
      })
      .catch(err => {
        res.status(500).json(`${err}: Information not available`);
      });
   
   });

//Project Endpoint for Get By Id
app.get('/projects/:id', (req, res) => {
    console.log(req.params); //Test for req.params shape
    projectModel.get(req.params.id)
      .then(projects => {
        res.status(200).json(projects);
      })
      .catch(err => {
        res.status(500).json(`${err}: Information not available`);
      });
   });

//Project Endpoint for Create Operation
app.post('/projects', (req, res, next) => {
    const { name, description, completed } = req.body;
    const newProject = { name, description, completed };
    projectModel.insert(newProject)
      .then(
        res.status(200).json(newProject)
      )
      .catch(err => {
        console.error(err);
      });
   });

//Project Endpoint for Update Operation
app.put('/projects', (req, res, next) => {
    const { name, description, id } = req.body;
    const updatedProject = { name, description };
    projectModel.update(id, updatedProject)
      .then(
        res.status(200).json(updatedProject)
      )
      .catch(err => {
        console.error(err);
      });
   });

  //Project Endpoint for Delete Operation




 
   





//Action Endpoint for Get Operation
app.get('/actions', (req, res, next) => {
    actionModel.get()
      .then(actions => {
        res.status(200).json(actions)
      })
      .catch(err => {
        res.status(500).json(err)
      })
   
   })








//Port & Port Listner
const port = 7000;
app.listen(port, () => console.log(`\n Listening on on port ${port}`));