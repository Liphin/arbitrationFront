/**
 * Created by Administrator on 2017/2/21.
 */
//获取目标environment，若无则默认赋值global变量为dev
global.env = process.env.TARGET_ENV;
if (env == undefined || env == '' || env == null) {
    global.env = 'dev';
}
var request = require('request');
var express = require('express');
/*对象数据实例化*/
var app = express();
var PORT = 3033;


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


var url = 'https://14.23.88.138:7777/api/arb/1.0/globalItem?type='+encodeURIComponent("身份类别");
const options = {
    url: url,
    method: 'GET',
    rejectUnauthorized: false,
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer 987b2847-3a78-3a49-970b-264fbaa3ec7c'
    }
};
// request(options, function(err, res, body) {
//     if (!err) {
//         console.log(body);
//
//     } else {
//         console.log(err, res);
//     }
// });


var urlPost = 'https://14.23.88.138:7777/api/arb/1.0/arbcase';
var requestData = {
    appName: 'rwerr',
    moduleName: '42343',
    operaterType: '申请人', //取值范围为： 申请人、第三方
    operater: 'Beanson',
    arbcaseInfo: JSON.stringify({
        caseFlowType: "qidaifuturetech-p2p-1",
        commissionCode: "gzac",
        claim: {
            "reason": ""/*事实与理由|示例:操作*/,
            "claimItems": [
                {
                    "materialCode": "第（一）项仲裁请求",
                    "claimContent": ""/*请求内容|示例:裁决两被申请人立即向申请人偿还借款本金680000元，并立即支付利息及违约金（利息及违约金以680000元为本金，按照每月2%的利率计算，自2018年9月19日起算，计至所有款项实际清偿之日止，暂计至2018年10月30日为¥19039.86元）；*/,
                    "claimType": "给付之诉"/*请求类型*/,
                    "disputeFee": ""/*标的*/,
                    "payItem": "0"/*无标的请求项*/,
                    "litigants": "时代大厦"/*申请人*/,
                    "extData": {
                        "claimMoney": ""/*请求本金*/,
                        "interestAndPenaltyClaimRate": ""/*利息及违约金的请求利率|示例:24%*/,
                        "startDate": ""/*起算日期*/
                    }
                }
            ]
        },
        litigants: [
            {
                "materialCode": "出借人",
                "name": "hello"/*名称*/,
                "nature": "自然人"/*类型*/,
                "mobiles": "183443323432"/*联系号码*/,
                "contacts": "hello"/*联系人*/,
                "idCardType": "身份证"/*证件类型*/,
                "idCardNo": "4417232443424"/*证件号码*/,
                "emails": "342333432@qq.com"/*邮箱地址*/,
                "addresses": "广州市打发大水发大水分代算法"/*联系地址*/,
                "sex": "男"/*性别|取值选择:[
             '男',
             '女'
             ]*/,
                // "files": [
                //     {
                //         "fileName": "身份证正反面"/*文件类型范围:pdf/png/jpg*/,
                //         "fileKey": "232132112"/*fileKey*/
                //     }
                // ],
                "litigantType": "申请人"/*当事人类型*/
            }
        ],
        agents: [
            {
                "materialCode": "申请人代理人",
                "name": ""/*姓名|非必填*/,
                "mobiles": ""/*联系号码*/,
                "identityType": "身份证"/*证件类型*/,
                "identityNo": "2342343243242"/*证件号码*/,
                "principals": "订单"/*委托人*/,
                "power": "一般代理"/*代理权限*/,
                "powerDetail": "代为提起仲裁请求;代为参加庭审、进行质证、辩论;代为和解、调解;代为主张、变更、放弃仲裁请求;代为签收法律文书;代为申请执行等"/*代理权限明细|非必填*/,
                "company": "大大大是爽肤水"/*工作单位|非必填*/,
                "emails": "23243232@qq.com"/*邮箱地址*/,
                "addresses": "的发生的范德萨发"/*联系地址*/,
                "agentType": "律师代理"/*代理人属性*/,
                "litigantType": "都是发顺丰的"/*当事人类型*/,
                // "files": [
                //     {
                //         "fileName": "律师执业证"/*文件类型范围:pdf/jpg/png*/,
                //         "fileKey": "334342343"/*fileKey*/
                //     },
                //     {
                //         "fileName": "授权委托书"/*文件类型范围:pdf/jpg/png*/,
                //         "fileKey": "334342343"/*fileKey*/
                //     },
                //     {
                //         "fileName": "所函"/*文件类型范围:jpg/pdf/png*/,
                //         "fileKey": "334342343"/*fileKey*/
                //     }
                // ]
            }
        ],
        evidences: [
            {
                "providerType": ""/*提交方类型|取值选择:[
             '申请方',
             '被申请方'
             ]*/,
                "provider": ""/*提交者|示例:申请人姓名*/,
                "evidenceItems": [
                    {
                        "materialCode": "《借款抵押合同》",
                        "name": "地方发的"/*名称*/,
                        "content": "对方水电费是"/*内容*/,
                        "hasOriginal": true/*是否有原件*/,
                        "extData": {
                        }
                    }
                ]
            }
        ]
    }),
    productCode: 'qidaifuturetech-p2p-1',
    consumerCaseid: '343fdfsfsd'
};

// request({
//     url: urlPost,
//     method: "POST",
//     rejectUnauthorized: false,
//     headers: {
//         "content-type": "form-data",
//         'Authorization': 'Bearer 987b2847-3a78-3a49-970b-264fbaa3ec7c'
//     },
//     body: JSON.stringify(requestData)
// }, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//         console.log(body);
//     } else {
//         console.log('error', response);
//     }
// });


var headers = {
    "Accept": "application/json",
    'Authorization': 'Bearer 987b2847-3a78-3a49-970b-264fbaa3ec7c'
};
request.post({
    url: urlPost,
    formData: requestData,
    headers: headers,
    rejectUnauthorized: false
}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log('999999999999999', body);
    } else {
        console.log('error', error, response, body);
    }
});
//
//
// var message = {
//     "litigants": [{
//         "idCardType": "自然人或者个体户负责人证件类型不能为空",
//         "mobiles": "联系号码不能为空",
//         "sex": "自然人或者个体户负责人性别不能为空",
//         "idCardNo": "自然人或者个体户负责人证件号码不能为空",
//         "name": "当事人姓名不能为空",
//         "contacts": "联系人名称不能为空"
//     }, {"案件信息": "缺少被申请人"}],
//     "claim": {"claimItems": [{"litigants": "提出该请求的当事人名称不能为空", "disputeFee": "请求标的不能为空", "claimContent": "请求项不能为空"}]},
//     "evidences": [{
//         "provider": "证据提供者不能为空",
//         "evidenceItem": [{"name": "证据名称不能为空", "hasOriginal": "是否有原件不能为空", "content": "证明内容不能为空"}],
//         "providerType": "证据提供者类型不能为空"
//     }],
//     "agents": [{
//         "identityNo": "证件号码不能为空",
//         "litigantType": "当事人类型不能为空",
//         "agentType": "代理人分类不能为空",
//         "identityType": "证件类型不能为空",
//         "mobiles": "联系号码不能为空",
//         "sex": "代理人性别不能为空",
//         "name": "代理人名称不能为空",
//         "principals": "委托人不能为空",
//         "power": "代理权限不能为空"
//     }]
// };


//app.listen(PORT);

//console.log("Server is running at port: " + PORT + " , and at environment: " + global.env);

