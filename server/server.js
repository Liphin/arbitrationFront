/**
 * Created by Administrator on 2017/2/21.
 */
//获取目标environment，若无则默认赋值global变量为dev
global.env = process.env.TARGET_ENV;
if (env == undefined || env == '' || env == null) {
    global.env = 'dev';
}
var fs = require('fs');
var http = require('http');
var https = require('https');
var request = require('request');
var multer = require('multer');
var express = require('express');
var bodyParser = require('body-parser');
var device = require('express-device');
var ServerSer = require('./serverSer');
var MiniSer = require('./mini/MiniSer');
var mongoDBSer = require('./mongo/MongoSer');
var serverSerData = require('./serverSerData');


/*对象数据实例化*/
var app = express();
var serverSer = new ServerSer();
var miniSer = new MiniSer();
var PORT = serverSerData.port;

//设置http请求接收数据配置和最大限额等
app.use(device.capture());
app.use(bodyParser.json({limit: serverSerData.httpDataLimit}));
app.use(bodyParser.urlencoded({limit: serverSerData.httpDataLimit, extended: true}));


/**
 * 设置跨域通信
 * @see serHelper.setCrossOrigin
 */
// app.use(function (req, res, next) {
//     serHelper.setCrossOrigin(req, res, next);
// });

/**
 * 管理员登录设置
 */
app.post('/managerLogin', function (req, res) {
    //res.send(true);
    mongoDBSer.findDocuments("manager", req.body, function (resData) {
        //若该账号密码正确则返回查找数据库后第一个数值，否则返回false
        if (resData.length > 0) {
            res.send(resData[0]);
        } else {
            res.send(false);
        }
    });
});


/**
 * 获取所有仲裁数据并返回list数组
 */
app.post('/getArbiList', function (req, res) {
    //查找arbilist数据表并返回所有提交过的仲裁数据
    mongoDBSer.findDocuments('arbilist', {}, function (docs) {
        res.send({
            'status_code': 200,
            'data': docs
        });
    });
});


/**
 * 查看arbi数据的操作
 */
app.post('/viewArbiOpt', function (req, res) {
    //查找arbilist数据表并返回所有提交过的仲裁数据
    mongoDBSer.findDocuments('arbidetail', {'timestamp': req.body['timestamp']}, function (docs) {
        res.send({
            'status_code': 200,
            'data': docs
        });
    });
});


/**
 * 插入或更新arbitration数据库
 */
var insertUpdateArbiDb = function (arbiDetail, arbiList, callback) {
    mongoDBSer.connectToMongo(function (db) {
        db.db(mongoDBSer.dbArbitration).collection('arbilist').find({'timestamp': arbiDetail['timestamp']}).toArray(function (err, docs) {
            if (docs.length > 0) {
                //已有该记录插入，进行update操作
                var whereStr = {'timestamp': arbiDetail['timestamp']};
                db.db(mongoDBSer.dbArbitration).collection('arbilist').updateOne(whereStr, {$set: {'data': arbiList['data']}}, function (err, res) {
                    db.db(mongoDBSer.dbArbitration).collection('arbidetail').updateOne(whereStr, {$set: {'data': arbiDetail['data']}}, function (err, res) {
                        callback();
                        db.close();
                    });
                });

            } else {
                //未有该记录插入，进行insert操作
                db.db(mongoDBSer.dbArbitration).collection('arbilist').insertOne(arbiList, function (err, res) {
                    db.db(mongoDBSer.dbArbitration).collection('arbidetail').insertOne(arbiDetail, function (err, res) {
                        callback();
                        db.close();
                    });
                });
            }
        });
    })
};


/**
 * 保存arbi数据
 */
app.post('/saveArbiInfo', function (req, response) {
    var param = req.body;
    var arbiDetail = {
        'timestamp': param['timestamp'],
        'data': param['submitData'],
    };
    var arbiList = {
        'timestamp': param['timestamp'],
        'data': param['saveData'],
    };
    insertUpdateArbiDb(arbiDetail, arbiList, function () {
        response.send({'status_code': 200});
    });
});


/**
 * 提交新的诉讼数据
 */
app.post('/submitNewArbiData', function (req, res) {

    //上传到易简网平台
    var urlPost = 'https://14.23.88.138:7777/api/arb/1.0/arbcase';
    //设置头部
    var headers = {
        "Accept": "application/json",
        'Authorization': 'Bearer 987b2847-3a78-3a49-970b-264fbaa3ec7c'
    };
    //console.log('request body', req.body);
    // console.log('encoded request body', encodeURIComponent(req.body));

    //上传数据到易简网
    request.post({
        url: urlPost,
        formData: req.body['submitData'],
        headers: headers,
        rejectUnauthorized: false

    }, function (error, response, bodyJson) {
        console.log(bodyJson);
        if (!error && response.statusCode == 200) {
            var body = JSON.parse(bodyJson);
            console.log('submit response', body);
            if (body['code'] == 1) {
                //保存到mongo数据库
                //list数据，存储基础展示数据
                req.body['saveData']['arbcaseId'] = body['arbcaseId'];
                var saveListData = {
                    'timestamp': req.body['timestamp'],
                    'data': req.body['saveData']
                };

                //存储detail数据，用于查询详情时使用
                var saveDetailData = {
                    'timestamp': req.body['timestamp'],
                    'data': req.body['submitData']
                };

                //分别异步插入或更新arbilist和arbidetail中
                insertUpdateArbiDb(saveDetailData, saveListData, function () {
                    //返回arbcaseId
                    res.send({
                        'status_code': 200,
                        'data': body['arbcaseId'],
                    });
                });

            } else {
                res.send({
                    'status_code': body['fault']['code'],
                    'data': body['fault']['message'],
                })
            }

        } else {
            //发送数据到易简网出错
            console.log('post submitNewArbiData error', error, body);
            res.send({
                'status_code': 400,
                'data': 'post data error',
            })
        }
    });
});


/**
 * 查询仲裁数据的进度
 */
app.post('/progressArbiOpt', function (req, response) {
    //获取指定案件的进度
    var urlGet = 'https://14.23.88.138:7777/api/arb/1.0/arbcaseProgress/' + req.body['arbcaseId'] +
        '?operaterType=' + encodeURIComponent(req.body['operaterType']) + '&operater=' + encodeURIComponent(req.body['operater']);
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
        console.log(bodyJson);
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
});


/**
 * 撤销仲裁请求
 */
app.post('/withdrawArbiOpt', function (req, res) {
    //获取指定案件的进度
    var urlPost = 'https://14.23.88.138:7777/api/arb/1.0/claimWithdraw/' + req.body['arbcaseId'];
    //设置头部
    var headers = {
        "Accept": "application/json",
        'Authorization': 'Bearer 987b2847-3a78-3a49-970b-264fbaa3ec7c'
    };
    request.post({
        url: urlPost,
        formData: {'operaterType': req.body['operaterType'], 'operater': req.body['operater']},
        headers: headers,
        rejectUnauthorized: false

    }, function (error, response, bodyJson) {
        console.log(bodyJson);
        var body = JSON.parse(bodyJson);
        if (!error && response.statusCode == 200) {
            res.send({
                'status_code': 200,
                'data': body,
            });

        } else {
            //发送数据到易简网出错
            console.log('post withdrawArbiOpt error', error, body);
            res.send({
                'status_code': 400,
                'data': 'post data error',
            })
        }
    });
});


/**
 * 用户上传资源文件数据
 */
var storage = multer.diskStorage({
    //指定保存的文件夹
    destination: function (req, file, cb) {
        cb(null, serverSerData.resourcePath)
    },
    //指定保存的文件名
    filename: function (req, file, cb) {
        cb(null, req.body['tempFileName'])
    }
});
var upload = multer({storage: storage});
app.post('/uploadResource', upload.single('file'), function (req, res) {
    console.log('post filename', req.body['fileName']);
    //上传到易简网平台
    var urlPost = 'https://14.23.88.138:7777/api/1.0/file';
    //设置头部
    var headers = {
        "Accept": "application/json",
        'Authorization': 'Bearer 987b2847-3a78-3a49-970b-264fbaa3ec7c'
    };
    //表单数据设置
    var formData = {
        'fileName': encodeURIComponent(req.body['fileName']),
        'fileBody': req.file.toString('base64')
    };
    //上传数据到易简网
    request.post({
        url: urlPost,
        formData: formData,
        headers: headers,
        rejectUnauthorized: false
    }, function (error, response, bodyJson) {
        console.log(bodyJson);
        var body = JSON.parse(bodyJson);
        if (!error && response.statusCode == 200) {

            //重命名文件名
            var tempFileUrl = serverSerData.resourcePath + '/' + req.body['tempFileName'];
            var newFileUrl = serverSerData.resourcePath + '/' + body['fileKey'];

            //如果已经存在该文件先删除，否则将导致重命名后文件异常
            fs.access(newFileUrl, error => {

                if (!error) {
                    console.log('remove file first', newFileUrl);
                    fs.unlinkSync(newFileUrl);
                }

                fs.rename(tempFileUrl, newFileUrl, function (err) {
                    if (err) {
                        //重命名文件出错
                        console.log('rename failure', err);
                        res.send(false);

                    } else {
                        console.log('rename success');
                        res.send(body)
                    }
                });
            });



        } else {
            //发送数据到易简网出错
            console.log('post data to YiJian error');
            res.send(false);
        }
    });
});


/**
 * 多选删除仲裁数据
 */
app.post('/deleteBatchArbi', function (req, response) {
    var toDeleteArray = req.body['toDeleteArray'];
    mongoDBSer.connectToMongo(function (db) {
        deleteArbiListItem(db, toDeleteArray, 0, 0 < toDeleteArray.length - 1, response);
    });
});
/**
 * 删除db中数据操作
 */
var deleteArbiListItem = function (db, toDeleteArray, i, toContinue, response) {
    var whereStr = {'timestamp': toDeleteArray[i]};
    db.db(mongoDBSer.dbArbitration).collection('arbilist').deleteOne(whereStr, function (err, res) {
        if (!toContinue) {
            db.close();
            response.send({
                'status_code': 200,
            })
        } else {
            ++i;
            deleteArbiListItem(db, toDeleteArray, i, i < toDeleteArray.length - 1, response)
        }
    });
};


/**
 * mongoDB处理
 */
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/arbitration";
// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("runoob");
//     // 删除 test 集合
//     dbo.collection("test").drop(function(err, delOK) {  // 执行成功 delOK 返回 true，否则返回 false
//         if (err) throw err;
//         if (delOK) console.log("集合已删除");
//         db.close();
//     });
// });

//
// var url = 'https://14.23.88.138:7777/api/test/1.0/helloApi?name=TestHelloApi';
// const options = {
//     url: url,
//     method: 'GET',
//     headers: {
//         'Accept': 'application/json',
//         'headers': {
//             Authorization: 'Bearer 987b2847-3a78-3a49-970b-264fbaa3ec7c',
//         }
//     },
//     rejectUnauthorized: false,
//     insecure: true
//
// };
// request(options, function (err, res, body) {
//     if (!err) {
//         console.log(body);
//
//     } else {
//         console.log(err, res);
//     }
//
// });

// request({
//     url: url,
//     method: "POST",
//     json: true,
//     headers: {
//         "content-type": "application/json",
//     },
//     body: JSON.stringify(requestData)
// }, function(error, response, body) {
//     if (!error && response.statusCode == 200) {
//     }
// });


//资源文件获取
app.use("/resource", express.static(serverSerData.resourcePath));
app.use("/", express.static(serverSerData.projectPath + "/public"));
app.listen(PORT);
console.log("Server is running at port: " + PORT + " , and at environment: " + global.env);

