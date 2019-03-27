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
        console.log("执行getAccessToken");
        var consumer_key = serverSerData.overallData['key']['consumer_key'];
        var consumer_secret = serverSerData.overallData['key']['consumer_secret'];
        var grant_type = "password";
        var username = serverSerData.overallData['key']['username'];
        var password = serverSerData.overallData['key']['password'];
        var urlPost = util.format(getAccessTokenUrl,grant_type,username,password);
        var consumer = consumer_key+":"+consumer_secret;
        var swap = new Buffer(consumer);
        var Authorization = "Basic "+swap.toString('base64');
        var timestamp = getTimestamp();
        //设置头部
        var headers = {
            'Authorization': Authorization
        };

        request.post({
            url: urlPost,
            headers: headers,
            rejectUnauthorized: false

        }, function (error, response, bodyJson) {
            console.log(bodyJson);
            if (!error && response.statusCode == 200) {
                var body = JSON.parse(bodyJson);
                console.log('获取accesstoken成功', body);
                serverSerData.overallData['access']['access_token'] = body['access_token'];
                serverSerData.overallData['access']['refresh_token'] = body['refresh_token'];
                serverSerData.overallData['access']['scope'] = body['scope'];
                serverSerData.overallData['access']['token_type'] = body['token_type'];
                serverSerData.overallData['access']['expires_in'] = body['expires_in'];
                serverSerData.overallData['access']['timestamp'] = timestamp;

                console.log(serverSerData.overallData['access']);
                refreshAccessToken();

            } else {
                //发送数据到易简网出错
                console.log('post getAccessToken error', error, body);

            }
        });
    }

    var refreshAccessToken = function () {
        //刷新accesstoken
        console.log("执行refreshAccessToken");
        var consumer_key = serverSerData.overallData['key']['consumer_key'];
        var consumer_secret = serverSerData.overallData['key']['consumer_secret'];
        var grant_type = "refresh_token";
        var refresh_token = serverSerData.overallData['access']['refresh_token'];
        var urlPost = util.format(refreshAccessTokenUrl,grant_type,refresh_token);
        var consumer = consumer_key+":"+consumer_secret;
        var swap = new Buffer(consumer);
        var Authorization = "Basic "+swap.toString('base64');
        var timestamp = getTimestamp();
        //设置头部
        var headers = {
            'Authorization': Authorization
        };

        request.post({
            url: urlPost,
            headers: headers,
            rejectUnauthorized: false

        }, function (error, response, bodyJson) {
            console.log(response.statusCode,bodyJson);
            if (!error && response.statusCode == 200) {
                var body = JSON.parse(bodyJson);
                console.log('刷新accesstoken成功', body);
                serverSerData.overallData['access']['access_token'] = body['access_token'];
                serverSerData.overallData['access']['refresh_token'] = body['refresh_token'];
                serverSerData.overallData['access']['scope'] = body['scope'];
                serverSerData.overallData['access']['token_type'] = body['token_type'];
                serverSerData.overallData['access']['expires_in'] = body['expires_in'];
                serverSerData.overallData['access']['timestamp'] = timestamp;

                console.log(serverSerData.overallData['access']);

            } else {
                //发送数据到易简网出错
                console.log('post refreshAccessToken error', error, body);
                //console.log("刷新accesstoken不成功，重新获取accesstoken");
                //getAccessToken();

            }
        });
    }

    /**
     * 获取时间戳函数
     * @returns {string}
     */
    var getTimestamp = function () {
        return parseInt(new Date().getTime()/1000).toString();
    };


    /**
     * 睡眠
     * @returns {}
     */
    // var sleep = function(numberMillis) {
    //     var now = new Date();
    //     var exitTime = now.getTime() + numberMillis;
    //     while (true) {
    //         now = new Date();
    //         if (now.getTime() > exitTime)
    //             return;
    //     }
    // }


    /**
     * 每天任务获取accessToken数据操作
     * TODO 完善生产环境下获取access_token
     */
    var scheduleGetAccessToken = function () {
        if (!checkDataNotEmpty(serverSerData.overallData['access']['refresh_token'])) {
            console.log("开始获取accesstoken");
            getAccessToken();
        }
        else {
            var ref_timestamp = getTimestamp();
            var sum_timestamp = (parseInt(serverSerData.overallData['access']['expires_in']) + parseInt(serverSerData.overallData['access']['timestamp'])).toString();
            console.log(ref_timestamp,sum_timestamp);
            // if (ref_timestamp<sum_timestamp) {
            //     console.log("开始刷新accesstoken");
            //     refreshAccessToken();
            // }
            // else {
            //     sleep(5000);
            //     getAccessToken();
            // }
            refreshAccessToken();
        }
    }

    /**
     * 服务器初始化数据操作
     */
    this.dataInit=function () {
        console.log("服务器初始化");
        //如果是生产环境则进行企业数据的初始化操作
        if(serverSerData.isProd){
            //初始化企业部门和用户信息
            scheduleGetAccessToken();
        }

        // var rule = new schedule.RecurrenceRule();
        // var times = [1,13];
        // rule.hour  = times;

        //配置每天早上6点更新accesstoken信息
        schedule.scheduleJob(serverSerData.getAccesstoken['time'], function(){
            console.log("定时获取accesstoken");
            scheduleGetAccessToken();
        });
    }


}

module.exports = ServerSer;