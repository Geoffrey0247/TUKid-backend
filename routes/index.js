/**
 * Created by GBC on 2017/3/7.
 */
'use strict'

const _       = require('lodash');
const express = require('express');
const router  = express.Router();

const prefix = '/api';

module.exports = exports = function () {
    //router.get('/', (req, res) => { return res.redirect('/dashboard') });

    // restful接口
    let modelList = ['user','test'];
    modelList.forEach(function(model) {
        let snakeModelName = _.snakeCase(model);
        router.get    (prefix + `/${model}`,     require(`../controllers/${snakeModelName}`).get    );
        router.get    (prefix + `/${model}/:id`, require(`../controllers/${snakeModelName}`).getById);
        router.post   (prefix + `/${model}`,     require(`../controllers/${snakeModelName}`).post   );
        router.put    (prefix + `/${model}/:id`, require(`../controllers/${snakeModelName}`).put    );
        router.delete (prefix + `/${model}/:id`, require(`../controllers/${snakeModelName}`).delete );
    });
    router.post(prefix + '/sendSmsCode', require("../controllers/sms").sendSmsCode);
    router.post(prefix + '/verifySmsCode', require("../controllers/sms").verifySmsCode);

    return router;
};
