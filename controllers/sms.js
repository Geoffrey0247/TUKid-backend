/**
 * Created by GBC on 2017/3/10.
 */

'use strict'

const _         = require('lodash');
const Validator = require('node-validator');
const Util      = require('./util');
const MyUtil      = require('../util/index');

exports.sendSmsCode = function(req, res, next) {
    let util  = new Util(req, res);
    let Sms = req.app.model.Sms;
    let body  = req.body;

    let resData = {};
    let check = Validator
        .isObject()
        .withRequired('phone', Validator.isString());
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
        //阿里大于
        var client = req.app.alidayuClient;
        var code = MyUtil.getSmsCode();
        client.execute('alibaba.aliqin.fc.sms.num.send', {
            'extend':'123456',
            'sms_type':'normal',
            'sms_free_sign_name':'注册验证',
            'sms_param':`{\"code\":\"${code}\",\"product\":\"体亦优\"}`,
            'rec_num':body.phone,
            'sms_template_code':'SMS_4965149'
        }, function(error, response) {
            if (!error) {
                //发送成功
                body.code = code;
                body.state = 'NOT_VER';
                Sms.create(body).then((result) => {
                    resData.success = true;
                    resData.result = result;
                    return res.send(resData);
                }).catch(util.sendError);

                console.log(response);
            }
            else console.log(error);
        });
    });
};

exports.verifySmsCode = function(req, res, next) {
    let util  = new Util(req, res);
    let Sms = req.app.model.Sms;
    let body  = req.body;

    let resData = {};
    let check = Validator
        .isObject()
        .withRequired('id', Validator.isString())
        .withRequired('code', Validator.isString());
    // 验证body
    body = _.pick(body, ['id','code']);
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
        body.state = 'SUCCESS';
        body.verAt = MyUtil.getCurrentTime();
        // 检查id是否存在
        Sms.findByPrimary(body.id).then((workingSms) => {
            if(!workingSms) {
                resData.success = false;
                resData.error = {
                    message: `User "${body.id}" has not existed.`
                };
                return res.send(resData);
            }
            if(workingSms.code != body.code) {
                resData.success = false;
                resData.error = {
                    message: `Wrong code!`
                };
                return res.send(resData);
            }
            workingSms.update(body).then(function(result) {
                resData.success = true;
                resData.result = result;
                return res.send(resData);
            }).catch(util.sendError);
            //绑定手机号
        }).catch(util.sendError);
    });
};