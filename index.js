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