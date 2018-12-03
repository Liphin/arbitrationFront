/**
 * Created by Administrator on 2018/5/15.
 */
var request = require('request');

function ServerSer() {

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
    this.checkDataNotEmpty = function (data) {
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


    /**
     * 每天任务获取accessToken数据操作
     * TODO 完善生产环境下获取access_token
     */
    this.scheduleGetAccessToken = function () {
        //获取accessToken
        var urlGet = 'https://14.23.88.138:7777/token?grant_type=GRANT_TYPE&username=USERNAME&password=PASSWORD';
        var options = {
            url: urlGet,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer 987b2847-3a78-3a49-970b-264fbaa3ec7c',
            },
            rejectUnauthorized: false
        };
        request(options, function (err, res, bodyJson) {
            console.log('bodyJson',bodyJson);
            var body = JSON.parse(bodyJson);
            if (!err) {
                response.send({
                    'status_code': 200,
                    'data': body,
                });
            } else {
                console.log(err, body);
                res.send({
                    'status_code': 400,
                    'data': 'get data error',
                })
            }
        });
    }


}

module.exports = ServerSer;