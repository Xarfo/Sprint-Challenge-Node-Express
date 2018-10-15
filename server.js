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
        res.status(500).json(`${err}: Cannot Get`);
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
        res.status(500).json(`${err}: Cannot GET by Id`);
      });
   });

//Project Endpoint for Create Operation
app.post('/projects', (req, res) => {
    const { name, description, completed } = req.body;
    const newProject = { name, description, completed };
    console.log(newProject);
    projectModel.insert(newProject)
      .then(newProject => {
        res.status(200).json(newProject)
      })
      .catch(err => {
        console.error(`${err} Cannot POST`);
      });
   });

//Project Endpoint for Update Operation
app.put('/projects/:id', (req, res) => {
    const { name, description, id } = req.body;
    const updatedProject = { name, description };
    projectModel.update(req.params.id, updatedProject)
      .then(updatedProject => {
        res.status(200).json(updatedProject)
      })
      .catch(err => {
        console.error(`${err} Cannot PUT`);
      });
   });

//Project Endpoint for Delete Operation
app.delete('/projects/:id', (req, res) => {
  console.log(req.params); //Test for req.params shape
  projectModel.remove(req.params.id)
    .then(removedProject => {
      res.status(200).json(removedProject);
    })
    .catch(err => {
      res.status(500).json(`${err}: Cannot DELETE`);
    });
 });


//Action Routes
 
//Action Endpoint for Get Operation
app.get('/actions', (req, res) => {
    actionModel.get()
      .then(actions => {
        res.status(200).json(actions)
      })
      .catch(err => {
        res.status(500).json(err)
      });
   
   });

//Action Endpoint for Create Operation
app.post('/actions', (req, res, next) => {
    const { description, project_id, notes } = req.body;
    const newPost = { description, project_id, notes };
    actionModel.insert(newPost)
      .then(
        res.status(200).json(newPost)
      )
      .catch(err => {
        console.error(err);
      })
  })
  
//Action Endpoint for Update Operation  
app.put('/actions', (req, res, next) => {
    const { description, id } = req.body;
    const updatedAction = { description };
    actionModel.update(id, updatedAction)
      .then(
        res.status(200).json(updatedAction)
      )
      .catch(err => {
        console.error(err);
      })
  })
  
//Action Endpoint for Delete Operation  
app.delete('/actions', (req, res, next) => {
    const { id } = req.body;
    actionModel.remove(id)
      .then(
        res.status(200).json(`Action #${id} has been deleted`)
      )
      .catch(err => {
        console.error(err);
      })
  })   


//Port & Port Listner
const port = 7000;
app.listen(port, () => console.log(`\n Listening on on port ${port}`));