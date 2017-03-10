/**
 * Created by GBC on 2017/3/7.
 */

'use strict';

const Util      = require('../util');

exports.get = function(req, res, next) {
    Util.httpGet("http://localhost:3000/api/user").then(res => {
        console.log(res);
    });
};

exports.getById = function(req, res, next) {

};

exports.post = function(req, res, next) {

};

exports.put = function(req, res, next) {

};

exports.delete = function(req, res, next) {

};