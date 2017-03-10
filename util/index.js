/**
 * Created by GBC on 2017/3/10.
 */
'use strict';

var http = require("http");
var url = require("url");
var querystring = require('querystring');

exports.httpGet = function (strUrl) {
    return new Promise((resolve, reject) => {
        http.get(strUrl, function(res){
            res.setEncoding("utf-8");
            var resData = [];
            res.on("data", function(chunk){
                resData.push(chunk);
            }).on("end", function(){
                //console.log(resData.join(""));
                resolve(resData);
            });
        });
    });
};

exports.httpPost = function (strUrl, postData) {
    return new Promise((resolve, reject) => {
        // 目标地址
        var parse = url.parse(strUrl);

        //发送数据
        var data = querystring.stringify(postData);

        var options = {
            "method" : "POST",
            "host"   : parse.hostname,
            "path"   : parse.path,
            "port"   : parse.port,
            "headers": {
                "Content-Length" : data.length
            }
        };

        var req = http.request(options, function(res) {
            console.log('STATUS: ' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                console.log('BODY: ' + chunk);
            });
        });

        req.write(data + "\n");
        req.end();
    });
};