/**
 * Created by GBC on 2017/3/7.
 */

'use strict';

const _         = require('lodash');
const Validator = require('node-validator');
const Util      = require('./util');

function washResult(result) {
    return _.pick(result, ['id', 'nick_name', 'phone', 'openid']);
}

exports.get = function(req, res, next) {
    let util  = new Util(req, res);
    let User = req.app.model.User;
    let query = req.query;

    let queryOptions = {};
    let resData = {};
    // 需要获取那些字段
    queryOptions.attributes = {};
    queryOptions.attributes.exclude = ['deletedAt'];
    if(query.attributes instanceof Array) {
        queryOptions.attributes.include = query.attributes;
    }
    // 查询条件
    if(query.filter && typeof(query.filter) === 'object') {
        queryOptions.where = query.filter;
    }

    User.findAndCountAll(queryOptions).then((result) => {
        resData.success = true;
        resData.totalCount = result.count;
        resData.result = result.rows;
        res.send(resData);
    }).catch(util.sendError);
};

exports.getById = function(req, res, next) {
    let util  = new Util(req, res);
    let User = req.app.model.User;
    let id    = req.params.id;

    let resData = {};
    User.findByPrimary(id).then((result) => {
        if(result) {
            resData.success = true;
            resData.result = washResult(result)
        } else {
            resData.success = false;
            resData.error = {
                message: 'Cannot find this id'
            };
        }
        res.send(resData);
    }).catch(util.sendError);
};

exports.post = function(req, res, next) {
    let util  = new Util(req, res);
    let User = req.app.model.User;
    let body  = req.body;

    let resData = {};
    let check = Validator
        .isObject()
        .withRequired('openid', Validator.isString())
        .withRequired('nick_name', Validator.isString());
    // 验证body
    body = _.pick(body, ['openid', 'nick_name']);
    Validator.run(check, body, function(errorCount, errors) {
        if(errorCount) {
            resData.success = false;
            resData.error = {
                message: errors.map((error) => {
                    return `Validate ${error.parameter} error, ${error.message}`;
                })
            };
            return res.send(resData);
        }
        User.create(body).then((result) => {
            resData.success = true;
            resData.result = washResult(result);
            return res.send(resData);
        }).catch(util.sendError);
    });
};

exports.put = function(req, res, next) {
    let util  = new Util(req, res);
    let User = req.app.model.User;
    let id    = parseInt(req.params.id);
    let body  = req.body;

    let resData = {};
    let check = Validator
        .isObject()
        .withOptional('phone', Validator.isString());
    // 验证body
    body = _.pick(body, ['phone']);
    Validator.run(check, body, function(errorCount, errors) {
        if(errorCount) {
            resData.success = false;
            resData.error = {
                message: errors.map((error) => {
                    return `Validate ${error.parameter} error, ${error.message}`;
                })
            };
            return res.send(resData);
        }
        // 检查id是否存在
        User.findByPrimary(id).then((workingUser) => {
            if(!workingUser) {
                resData.success = false;
                resData.error = {
                    message: `User "${id}" has not existed.`
                };
                return res.send(resData);
            }
            workingUser.update(body).then(function(result) {
                resData.success = true;
                resData.result = washResult(result)
                return res.send(resData);
            }).catch(util.sendError);
        }).catch(util.sendError);
    });
};

exports.delete = function(req, res, next) {
    let util  = new Util(req, res);
    let User = req.app.model.User;
    let id    = parseInt(req.params.id);

    let resData = {};
    // 检查id是否存在
    User.findByPrimary(id).then((workingUser) => {
        if(!workingUser) {
            resData.success = false;
            resData.error = {
                message: `User "${id}" has not existed.`
            };
            return res.send(resData);
        }
        workingUser.destroy().then((result) => {
            resData.success = true;
            resData.result = washResult(result)
            return res.send(resData);
        }).catch(util.sendError);
    });
};
