/**
 * Created by GBC on 2017/3/7.
 */

// Base Setup
// ====================================================================================================
// call the package we need
var express = require('express');
var bodyParser = require('body-parser');
var Sequelize    = require('sequelize');

var initRoutes = require('./routes/index');
var initModels = require('./models/index');
var config = require('./config');

var app = express();
app.config = config;

// configure app to use middleware bodyParser()
// let us get the data from a POST
app.use(bodyParser.urlencoded({extend:true}));
app.use(bodyParser.json());

// 初始化数据库
var sequelize = new Sequelize(app.config.mysql.url, { logging: false });
app.db = sequelize;

// base route for API
// ====================================================================================================
app.use('/', initRoutes());

// init model
// ====================================================================================================
initModels(app, sequelize);

// start the api server
// ====================================================================================================
app.listen(app.config.port);
console.log('server start on port ' + app.config.port);