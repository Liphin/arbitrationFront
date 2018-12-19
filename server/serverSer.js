/**
 * Created by Administrator on 2018/5/15.
 */
var schedule = require('node-schedule');
var request = require('request');
var serverSerData = require('./serverSerData');
var util = require('util');

function ServerSer() {

    var getAccessTokenUrl = "https://api.gzyijian.com/token?grant_type=%s&username=%s&password=%s";
    var refreshAccessTokenUrl = "https://api.gzyijian.com/token?grant_type=%s&refresh_token=%s";

    /**
     * 返回时间戳值
     * @returns {number}
     */
    this.getTimeStamp = function () {
        return new Date().getTime();
    };


    /**
     * 设置异源访问策略
     * @param req
     * @param res
     * @param next
     */
    this.setCrossOrigin=function (req, res, next) {
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', dataHelper.crossOrigin['origin']);
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', dataHelper.crossOrigin['methods']);
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', dataHelper.crossOrigin['headers']);
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', dataHelper.crossOrigin['credentials']);
        // Pass to next layer of middleware
        next();
    };

    /**
     * 公用实用方法，统一判空检测
     * @param data
     * @returns {boolean}
     */
    var checkDataNotEmpty = function (data) {
        var status = false;
        if (data != null && data != undefined) {
            //根据变量的不同类型进行判空处理
            switch (Object.prototype.toString.call(data)) {
                /*String类型数据*/
                case '[object String]': {
                    if (data.trim() != '') {
                        status = true;
                    }
                    break;
                }
                /*Array类型*/
                case '[object Array]': {
                    if (data.length > 0) {
                        status = true;
                    }
                    break;
                }
                /*Object类型*/
                case '[object Object]': {
                    if (Object.keys(data).length > 0) {
                        status = true;
                    }
                    break;
                }
                /*其他类型状态默认设置为true，分别为Number和Boolean类型*/
                default: {
                    status = true;
                    break;
                }
            }
        }
        return status;
    };

    //获取accesstoken
    var getAccessToken = function () {
        //获取accessToken
        var consumer_key = serverSerData.overallData['key']['consumer_key'];
        var consumer_secret = serverSerData.overallData['key']['consumer_secret'];
        var grant_type = "password";
        var username = serverSerData.overallData['key']['username'];
        var password = serverSerData.overallData['key']['password'];
        var urlGet = util.format(getAccessTokenUrl,grant_type,username,password);
        var consumer = consumer_key+":"+consumer_secret;
        var swap = new Buffer(consumer);
        var Authorization = swap.toString('base64');

        var options = {
            url: urlGet,
            method: 'GET',
            Authorization: Authorization,
            rejectUnauthorized: false
        };
        request(options, function (err, res, bodyJson) {
            console.log('bodyJson',bodyJson);
            var body = JSON.parse(bodyJson);
            if (!err) {
                console.log("获取accesstoken成功");
                serverSerData.overallData['access']['access_token'] = body['access_token'];
                serverSerData.overallData['access']['refresh_token'] = body['refresh_token'];
                serverSerData.overallData['access']['scope'] = body['scope'];
                serverSerData.overallData['access']['token_type'] = body['token_type'];
                serverSerData.overallData['access']['expires_in'] = body['expires_in'];

                console.log(serverSerData.overallData['access']);
                refreshAccessToken();
            } else {
                console.log(err, body);
            }
        });
    }

    var refreshAccessToken = function () {
        //刷新accesstoken
        var consumer_key = serverSerData.overallData['key']['consumer_key'];
        var consumer_secret = serverSerData.overallData['key']['consumer_secret'];
        var grant_type = "refresh_token";
        var refresh_token = serverSerData.overallData['access']['refresh_token'];
        var urlGet = util.format(refreshAccessTokenUrl,grant_type,refresh_token);
        var consumer = consumer_key+":"+consumer_secret;
        var swap = new Buffer(consumer);
        var Authorization = swap.toString('base64');

        var options = {
            url: urlGet,
            method: 'GET',
            Authorization: Authorization,
            rejectUnauthorized: false
        };
        request(options, function (err, res, bodyJson) {
            console.log('bodyJson',bodyJson);
            var body = JSON.parse(bodyJson);
            if (!err) {
                console.log("刷新accesstoken成功");
                serverSerData.overallData['access']['access_token'] = body['access_token'];
                serverSerData.overallData['access']['refresh_token'] = body['refresh_token'];
                serverSerData.overallData['access']['scope'] = body['scope'];
                serverSerData.overallData['access']['token_type'] = body['token_type'];
                serverSerData.overallData['access']['expires_in'] = body['expires_in'];
                console.log(serverSerData.overallData['access']);
            } else {
                console.log(err, body);
                console.log("刷新accesstoken不成功，重新获取accesstoken");
                getAccessToken();
            }
        });
    }


    /**
     * 每天任务获取accessToken数据操作
     * TODO 完善生产环境下获取access_token
     */
    var scheduleGetAccessToken = function () {

        if (checkDataNotEmpty(serverSerData.overallData['access']['refresh_token'])) {
            getAccessToken();
        }
        else {
            refreshAccessToken();
        }
    }

    /**
     * 服务器初始化数据操作
     */
    this.dataInit=function () {

        //如果是生产环境则进行企业数据的初始化操作
        if(serverSerData.isProd){
            //初始化企业部门和用户信息
            scheduleGetAccessToken();
        }

        //配置每天早上6点更新部门和用户数据信息
        schedule.scheduleJob(serverSerData.getAccesstoken['time'], function(){
            scheduleGetAccessToken();
        });
    }


}

module.exports = ServerSer;