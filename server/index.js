const express = require('express');
const path = require('path');

const {exposeApi} = require('./Api/api');
const {connectDB} = require('./MongoDb/database');
const {reactApp} = require('./Web/routes');

const app = express();

connectDB(app);
reactApp(app,express,path);
exposeApi(app,express);