/**
 * Created by Administrator on 2018/12/1.
 */
var app = angular.module('Angular.arbilist');

app.factory('ArbiListDataHelperSer', function () {

    //其他附加数据
    var extDataHelper = {
        'claimItems': {
            "claimMoney": {
                'name': "请求本金",
                'placeholder': ''
            },
            "startDate": {
                'name': "起算日期",
                'placeholder': '实例：2017年11月15日'
            },
            "lawyerFee": {
                'name': "律师费",
                'placeholder': ''
            },
            "propertyAddress": {
                'name': "抵押房产地址",
                'placeholder': ''
            },
            "interestAndPenaltyClaimRate": {
                'name': "利息及违约金的请求利率",
                'placeholder': '示例:24%'
            },
            "claimGuarantyRepayMoney": {
                'name': "请求的代偿款",
                'placeholder': ''
            },
            "temporaryDate": {
                'name': "暂计时间",
                'placeholder': '示例:2018年08月15日'
            },
            "carNumber": {
                'name': "抵押车辆车牌号",
                'placeholder': '示例:晋A771ET'
            },
            "vehicleIdentificationNumber": {
                'name': "车辆识别代号",
                'placeholder': '示例:LSGEW53B1CS335697'
            },
            "carBrandType": {
                'name': "车辆品牌型号",
                'placeholder': '示例:别克牌SGM7306ATA'
            }
        },

        'evidences': {
            "loanContractNumber": {
                'name': "合同编号",
                'placeholder': ''
            },
            "loanContractSignDate": {
                'name': "合同签订时间",
                'placeholder': '实例：2017年11月15日'
            },
            "borrowerServedMobile": {
                'name': "借款人送达手机",
                'placeholder': ''
            },
            "borrowerServedMail": {
                'name': "借款人送达邮箱",
                'placeholder': ''
            },
            "conventionalPrincipal": {
                'name': "合同约定借款本金",
                'placeholder': '示例:160000.00'
            },
            "loanTerm": {
                'name': "借款期限",
                'placeholder': '示例:2017年11月15日至2018年11月14日'
            },
            "conventionalInterestYearRate": {
                'name': "借款年利率",
                'placeholder': '示例:11%'
            },
            "repaymentMethod": {
                'name': "还款方式",
                'placeholder': '示例:先息后本，等额本息'
            },
            "PenaltyDayRate": {
                'name': "违约金日利率",
                'placeholder': '示例:3‰'
            },
            "borrowerName": {
                'name': "借款人姓名",
                'placeholder': '示例:吕武金'
            },
            "mortgagerName": {
                'name': "抵押人姓名",
                'placeholder': ''
            },
            "propertyAddress": {
                'name': "抵押房产地址",
                'placeholder': ''
            },
            "realEstateRegistrationCertificateNumber": {
                'name': "不动产登记证明号码",
                'placeholder': '示例:桂（2017）南宁市不动产证明第0208814号'
            },
            "supplementalAgreementSignDate": {
                'name': "补充合同签订日期",
                'placeholder': '实例：2017年11月15日'
            },
            "thirdParty": {
                'name': "委托第三方",
                'placeholder': '示例:东莞团贷网互联网科技服务有限公司'
            },
            "beneficiaryAccountName": {
                'name': "收款账号户名",
                'placeholder': '示例:吕武金'
            },
            "beneficiaryAccountNumber": {
                'name': "收款账号",
                'placeholder': '示例:6212262102020378453'
            },
            "bankOfdeposit": {
                'name': "开户行",
                'placeholder': '示例:中国工商银行'
            },
            "transactionDate": {
                'name': "转账日期",
                'placeholder': '示例:2017年11月15日'
            },
            "transactionMoney": {
                'name': "转账金额",
                'placeholder': '示例:151300.00'
            },
            "paymentAccountName": {
                'name': "付款账号户名",
                'placeholder': '示例:东莞团贷网互联网科技服务有限公司'
            },
            "IDCardNumber": {
                'name': "身份证号",
                'placeholder': ''
            },
            "lenderName": {
                'name': "出借人姓名",
                'placeholder': ''
            },
            "cashPayDate": {
                'name': "现金支付日期",
                'placeholder': '实例：2017年11月15日'
            },
            "cashAmount": {
                'name': "现金金额",
                'placeholder': '示例:8700.00'
            },
            "confirmationSignDate": {
                'name': "确认书签订日期",
                'placeholder': '示例:2017年11月15日'
            },
            "mortgageRegistrationDate": {
                'name': "抵押登记日期",
                'placeholder': '示例:2017年11月20日'
            },
            "mortgagee": {
                'name': "抵押权人",
                'placeholder': '描述:权利人（申请人）'
            },
            "amountOfSecuredCaims": {
                'name': "担保债权数额",
                'placeholder': '示例:160000.00'
            },
            "mortgageTerm": {
                'name': "债权起止时间",
                'placeholder': '示例:2017年11月15日至2018年11月14日'
            },
            "lawyerfee": {
                'name': "律师费",
                'placeholder': ''
            },
            "overdueMonth": {
                'name': "逾期月份",
                'placeholder': ''
            },
            "overduePrincipal": {
                'name': "剩余本金",
                'placeholder': ''
            },
            "repaymentPrincipal": {
                'name': "已还本金",
                'placeholder': ''
            },
            "PenaltyMonthRate": {
                'name': "违约金月利率",
                'placeholder': '示例:2%'
            },
            "borrowerAndMortgagerName": {
                'name': "借款人和抵押人姓名",
                'placeholder': '示例:吕胜'
            },
            "mortgageeName": {
                'name': "抵押权人姓名",
                'placeholder': '示例:珠海横琴瑞达融资租赁有限公司'
            },
            "lenderName": {
                'name': "出借人姓名",
                'placeholder': '示例:武文娟'
            },
            "carNumber": {
                'name': "抵押车辆车牌号",
                'placeholder': '示例:晋A771ET'
            },
            "carBrandType": {
                'name': "车辆品牌型号",
                'placeholder': '示例:别克牌SGM7306ATA'
            },
            "vehicleIdentificationNumber": {
                'name': "车辆识别代号",
                'placeholder': '示例:LSGEW53B1CS335697'
            },
            "transactionMoneyTotal": {
                'name': "转账总金额",
                'placeholder': '描述:20720.04+50000+4600=75320.04|示例:75320.04'
            },
            "certifier": {
                'name': "证明人",
                'placeholder': '示例:厦门银行股份有限公司'
            },
            "noticeTime": {
                'name': "通知作出时间",
                'placeholder': '示例:2018年07月22日'
            },
            "guarantyRepayPrincipal": {
                'name': "代偿本金",
                'placeholder': '示例:80000.00'
            },
            "guarantyRepayInterestAndPenalty": {
                'name': "代偿利息及违约金",
                'placeholder': '示例:3726.66'
            },
            "guarantyRepayMoneyTotal": {
                'name': "代偿总金额",
                'placeholder': '示例:83726.66'
            },
            "receiptTime": {
                'name': "回证作出时间",
                'placeholder': '示例:2018年07月22日'
            },
            "compensatoryPaymentAccountNumber": {
                'name': "代偿付款账号",
                'placeholder': ''
            },
            "compensatoryPaymentAccountName": {
                'name': "代偿付款账号户名",
                'placeholder': '示例:珠海横琴瑞达融资租赁有限公司'
            },
            "compensatoryBeneficiaryAccountNumber": {
                'name': "代偿收款账号",
                'placeholder': ''
            },
            "compensatoryBeneficiaryAccountName": {
                'name': "代偿收款账号户名",
                'placeholder': '示例:武文娟'
            },
            "receipAmount": {
                'name': "电子回证金额",
                'placeholder': '示例:83886.66'
            },
            "compensatoryTransactionDate": {
                'name': "代偿转账日期",
                'placeholder': '示例:2018年07月24日'
            },
            "compensatoryCertificateTime": {
                'name': "代偿证明作出时间",
                'placeholder': '示例:2018年07月24日'
            },
            "compensatoryCertificateCertifier": {
                'name': "代偿证明证明人",
                'placeholder': '示例:武文娟'
            },
            "guarantyRepayDate": {
                'name': "代偿日期",
                'placeholder': '示例:2018年07月24日'
            },
            "compensatorypenalty": {
                'name': "代偿日期",
                'placeholder': '代偿违约金|示例:1‰'
            }

        }
    };



    // var tempData = {
    //     //诉讼事件声明
    //     'claimItems': {
    //         'claimContent': '证据请求内容',//请求内容
    //         'claimType': '确认之诉',//请求类型：确认之诉，给付之诉，形成之诉
    //         'disputeFee': 0, //请求标的
    //         'litigants': '当事人名称',//当事人名称
    //         'materialCode': '新增仲裁请求',//仲裁请求描述
    //         'extData': {}//附加数据
    //     },
    //
    //
    //     //当事人对象
    //     'litigants': {
    //         'litigantType': '申请人',//当事人分类。申请人、被申请人、第三人
    //         'nature': '自然人',//当事人性质：自然人、企业、个体户、其他组织。
    //         'name': '打蜡', //当事人性质为自然人时，请填写当事人姓名；当事人性质为企业、个体户和其他组织时，请填写机构名称。
    //         'mobiles': '18316433415', //联系号码。如有多个请用英文逗号分隔
    //         'contacts': '张三,李四',//联系人名称。如有多个请用英文逗号分隔。
    //         'sex': '男',//性别：男、女（自然人必填、个体户请填写负责人的性别）。
    //         'legalRepresent': '广州**有限公司',//法定代表人（企业、个体户必填）。
    //         'post': '总经理',//法定代表人职务（企业必填）。通过5.7查询全局字段信息接口获取职务。
    //         'idCardType': '身份证',//证件类型（自然人、个体户必填）。通过5.7查询全局字段信息接口获取证件类型。
    //         'idCardNo': '441721199312177617',//证件号码（自然人、个体户必填）。
    //         'identityType': '多证合一营业执照',//证照类型（企业、个体户、其他组织必填）。通过5.7查询全局字段信息接口获取证照类型。
    //         'identityNo': '92330165MA5AR7GB98',//营业执照号码（企业、个体户、其他组织必填）。
    //         'emails': 'berrsonbar@qq.com',//联系邮箱。如有多个请用英文逗号分隔。
    //         'addresses': '广东省阳江市***路,广东省**市答案了路',//联系地址。如有多个请用英文逗号分隔。
    //         'materialCode': '测试当事人对象数据信息',//材料名称，用于类型化案件。
    //         'files': []//附件，以JSON数组表示
    //     },
    //
    //     //代理人对象
    //     'agents': {
    //         'agentType': '律师代理',//代理人分类：律师代理、公民代理。
    //         'name': '真三',//代理人名称。
    //         'sex': '男',//性别：男、女。
    //         'identityType': '身份证',//证件类型。通过5.7查询全局字段信息接口获取证件类型。
    //         'identityNo': '441721199312177617',//证件号码。
    //         'mobiles': '13243435533',//联系号码。如有多个请用英文逗号分隔。
    //         'litigantType': '申请人',//当事人类型：申请人、被申请人、第三人
    //         'principals': '委托人A,委托人B',//委托人名称。如果多个请用逗号分隔。
    //         'power': '一般代理',//代理权限：一般代理、特殊权限。
    //         'powerDetail': '',//如为特殊权限，则此项必填
    //         'company': '广州**有限公司',//公司名称。
    //         'emails': 'berrsonbar@qq.com',//联系邮箱。如有多个请用英文逗号分隔。
    //         'addresses': '广东省阳江市***路,广东省**市答案了路',//联系地址。如有多个请用英文逗号分隔。
    //         'materialCode': '测试代理人对象数据信息',//材料名称，用于类型化案件。
    //         'files': [],//附件，以JSON数组表示。
    //
    //         'powerDetailArray': [
    //             {'name': '代为提起仲裁请求', 'status': false},
    //             {'name': '代为参加庭审、进行质证、辩论', 'status': false},
    //             {'name': '代为和解、调解', 'status': false},
    //             {'name': '代为主张、变更、放弃仲裁请求', 'status': false},
    //             {'name': '代为签收法律文书', 'status': false},
    //             {'name': '代为申请执行', 'status': false}
    //         ]//辅助记录特殊权限的数组数据, 提交数据到易简网前删除该字段数组
    //     },
    //
    //     //证据对象
    //     'evidences': {
    //         'providerType': '申请方',//证据提供者类型：申请方、被申请方、第三方、其他
    //         'provider': '证据提供者名称1,证据提供者名称2',//证据提供者。如有多个请用英文逗号分隔
    //         'evidenceItems': []//证据项JSON数组。数组中为证据项JSON对象，具体内容请参看下表
    //     },
    // };
    //
    //
    // var arbiApplyDataTest = {
    //         "overall": {
    //             'operaterType': '申请人', //操作者类型， 申请人、第三方
    //             'operater': '操作者名称', //操作者名称
    //             'productCode': 'qidaifuturetech-p2p-1' //固定productCode
    //         },
    //         "claim": {
    //             "reason": '输入事实与理由',//原因
    //             "files":[
    //                 {
    //                     "fileName":"仲裁申请书.pdf"/*文件类型范围:pdf*/,
    //                     "fileKey":"ff801ab637267fb1f6ab961a3ff166d3}"/*fileKey*/
    //                 }
    //             ],
    //             "claimItems": [
    //                 {
    //                     "materialCode": "第（一）项仲裁请求",
    //                     "payItem": "0"/*无标的请求项*/,
    //                     "claimContent": "证据请求内容",//请求内容
    //                     "claimType": "给付之诉",//请求类型：确认之诉，给付之诉，形成之诉
    //                     "disputeFee": 0, //请求标的
    //                     "litigants": "打蜡1",//当事人名称
    //                     "extData": {
    //                         "claimMoney": "234324"/*请求本金*/,
    //                         "startDate": "2012-32-23", /*起算日期*/
    //                         "interestAndPenaltyClaimRate": "3d4%"/*利息及违约金的请求利率|示例:24%*/,
    //                     }
    //                 },
    //                 {
    //                     "materialCode": "第（二）项仲裁请求",
    //                     "payItem": "0"/*无标的请求项*/,
    //                     "claimContent": '证据请求内容',//请求内容
    //                     "claimType": '给付之诉',//请求类型：确认之诉，给付之诉，形成之诉
    //                     "disputeFee": 0, //请求标的
    //                     "litigants": "打蜡1",//当事人名称
    //                     "extData": {
    //                         "lawyerFee": "121元"/*律师费*/
    //                     }
    //                 },
    //                 {
    //                     "materialCode": "第（三）项仲裁请求",
    //                     "claimContent": '证据请求内容',//请求内容
    //                     "claimType": '给付之诉',//请求类型：确认之诉，给付之诉，形成之诉
    //                     "payItem": "0"/*无标的请求项*/,
    //                     "disputeFee": 0, //请求标的
    //                     "litigants": "打蜡1",//当事人名称
    //                     "extData": {
    //                         "propertyAddress": "是打发大水发大水费大幅度发"/*抵押房产地址*/
    //                     }
    //                 },
    //                 {
    //                     "materialCode": "第（四）项仲裁请求",
    //                     "claimContent": '证据请求内容',//请求内容
    //                     "claimType": "仲裁费"/*请求类型*/,
    //                     "payItem": "0"/*无标的请求项*/,
    //                     "disputeFee": 0, //请求标的
    //                     "litigants": "打蜡1",//当事人名称
    //                 }
    //             ] //请求项内容
    //         },
    //         'litigants': [
    //             {
    //                 "materialCode":"出借人",
    //                 "name":"打蜡1"/*名称*/,
    //                 "nature":"自然人"/*类型*/,
    //                 "mobiles":"18316433415"/*联系号码*/,
    //                 "contacts":"张三,李四"/*联系人*/,
    //                 "idCardType":"身份证"/*证件类型*/,
    //                 "idCardNo":"441721199312177617"/*证件号码*/,
    //                 "emails":"berrsonbar@qq.com"/*邮箱地址|非必填*/,
    //                 "addresses":"广东省阳江市***路,广东省**市答案了路"/*联系地址*/,
    //                 "sex":"男"/*性别|取值选择:['男','女']*/,
    //                 "files":[
    //                     {
    //                         "fileName":"身份证正反面.pdf"/*文件类型范围:pdf/png/jpg*/,
    //                         "fileKey":"ff801ab637267fb1f6ab961a3ff166d3}"/*fileKey*/
    //                     }
    //                 ],
    //                 "litigantType":"申请人"/*当事人类型*/
    //             },
    //             {
    //                 "materialCode":"出借人（企业）",
    //                 "name":"哈哈"/*名称*/,
    //                 "nature":"企业"/*类型（填“企业”）*/,
    //                 "mobiles":"18316433415"/*手机号*/,
    //                 "legalRepresent":"打蜡1"/*法定代表人*/,
    //                 "idCardType":"身份证"/*法定代表人证件类型*/,
    //                 "idCardNo":"441721199312177617"/*法定代表人证件号码*/,
    //                 "emails":"berrsonbar@qq.com"/*邮箱地址*/,
    //                 "addresses":"广东省阳江市***路,广东省**市答案了路"/*联系地址*/,
    //                 "identityType":"组织机构代码"/*证照类型*/,
    //                 "identityNo":"92330165MA5AR7GB98"/*证照号码*/,
    //                 "litigantType":"申请人"/*当事人类型*/
    //             },
    //             {
    //                 "materialCode":"借款人",
    //                 "name":"打蜡2"/*名称*/,
    //                 "nature":"自然人"/*类型*/,
    //                 "mobiles":"18316433415"/*联系号码*/,
    //                 "idCardType":"身份证"/*证件类型*/,
    //                 "idCardNo":"441721199312177617"/*证件号码*/,
    //                 "emails":"berrsonbar@qq.com"/*邮箱地址|非必填*/,
    //                 "addresses":"广东省阳江市***路,广东省**市答案了路"/*联系地址*/,
    //                 "contacts":"张三,李四"/*联系人|非必填*/,
    //                 "sex":"男"/*性别|取值选择:['男','女']*/,
    //                 "files":[
    //                     {
    //                         "fileName":"身份证正反面.pdf"/*文件类型范围:pdf/png/jpg*/,
    //                         "fileKey":"ff801ab637267fb1f6ab961a3ff166d3}"/*fileKey*/
    //                     }
    //                 ],
    //                 "litigantType":"被申请人"/*当事人类型*/
    //             }
    //         ],
    //         "agents": [
    //             {
    //                 "agentType": "律师代理",//代理人分类：律师代理、公民代理。
    //                 "name": '真三',//代理人名称。
    //                 "sex": '男',//性别：男、女。
    //                 "identityType": '身份证',//证件类型。通过5.7查询全局字段信息接口获取证件类型。
    //                 "identityNo": '441721199312177617',//证件号码。
    //                 "mobiles": '13243435533',//联系号码。如有多个请用英文逗号分隔。
    //                 "litigantType": '申请人',//当事人类型：申请人、被申请人、第三人
    //                 "principals": '委托人A,委托人B',//委托人名称。如果多个请用逗号分隔。
    //                 "power": '一般代理',//代理权限：一般代理、特殊权限。
    //                 "company": '广州**有限公司',//公司名称。
    //                 "emails": 'berrsonbar@qq.com',//联系邮箱。如有多个请用英文逗号分隔。
    //                 "addresses": '广东省阳江市***路,广东省**市答案了路',//联系地址。如有多个请用英文逗号分隔。
    //                 "materialCode": "申请人代理人",
    //                 "powerDetail": "代为提起仲裁请求;代为参加庭审、进行质证、辩论;代为和解、调解;代为主张、变更、放弃仲裁请求;代为签收法律文书;代为申请执行等"/*代理权限明细|非必填*/,
    //                 "files": [
    //                     {
    //                         "fileName": "律师执业证.pdf"/*文件类型范围:pdf/jpg/png*/,
    //                         "fileKey": "ff801ab637267fb1f6ab961a3ff166d3}"/*fileKey*/
    //                     },
    //                     {
    //                         "fileName": "授权委托书.pdf"/*文件类型范围:pdf/jpg/png*/,
    //                         "fileKey": "ff801ab637267fb1f6ab961a3ff166d3}"/*fileKey*/
    //                     },
    //                     {
    //                         "fileName": "所函.pdf"/*文件类型范围:jpg/pdf/png*/,
    //                         "fileKey": "ff801ab637267fb1f6ab961a3ff166d3}"/*fileKey*/
    //                     }
    //                 ],
    //                 "powerDetailArray": [
    //                     {'name': '代为提起仲裁请求', 'status': false},
    //                     {'name': '代为参加庭审、进行质证、辩论', 'status': false},
    //                     {'name': '代为和解、调解', 'status': false},
    //                     {'name': '代为主张、变更、放弃仲裁请求', 'status': false},
    //                     {'name': '代为签收法律文书', 'status': false},
    //                     {'name': '代为申请执行', 'status': false}
    //                 ]//辅助记录特殊权限的数组数据, 提交数据到易简网前删除该字段数组
    //             }
    //         ],
    //         'evidences': [
    //             {
    //                 "providerType": "申请方"/*提交方类型|取值选择:['申请方','被申请方']*/,
    //                 "provider": "申请方姓名，打蜡"/*提交者|示例:申请人姓名*/,
    //                 "evidenceItems": [
    //                     {
    //                         "materialCode": "《借款抵押合同》",
    //                         'name': '测试证据名称',//证据名称
    //                         'content': '这里是测试证据名称，这里是测试证据名称',//证明内容。
    //                         'hasOriginal': true,//是否有原件：true，false
    //                         "extData": {
    //                             "loanContractNumber": "rerrrwrwr4242"/*合同编号*/,
    //                             "loanContractSignDate": "22221424"/*合同签订时间*/,
    //                             "borrowerServedMobile": "343434424"/*借款人送达手机*/,
    //                             "borrowerServedMail": "34242@3434434"/*借款人送达邮箱*/,
    //                             "conventionalPrincipal": "160000.00"/*合同约定借款本金|示例:160000.00*/,
    //                             "loanTerm": "2017年11月15日至2018年11月14日"/*借款期限|示例:2017年11月15日至2018年11月14日*/,
    //                             "conventionalInterestYearRate": "11%"/*借款年利率|示例:11%*/,
    //                             "repaymentMethod": "ewqewewe"/*还款方式|示例:先息后本，等额本息*/,
    //                             "PenaltyDayRate": "3‰"/*违约金日利率|示例:3‰*/,
    //                             "borrowerName": "吕武金"/*借款人姓名|示例:吕武金*/,
    //                             "mortgagerName": "吕武金"/*抵押人姓名*/,
    //                             "propertyAddress": "吕武金吕武金吕武金吕武金吕武金"/*抵押房产地址*/,
    //                             "realEstateRegistrationCertificateNumber": "桂（2017）南宁市不动产证明第0208814号"/*不动产登记证明号码|示例:桂（2017）南宁市不动产证明第0208814号*/
    //                         },
    //                         "files":[
    //                             {
    //                                 "fileName":"《借款抵押合同》.pdf"/*文件类型范围:pdf*/,
    //                                 "fileKey":"ff801ab637267fb1f6ab961a3ff166d3}"/*fileKey*/
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         "materialCode": "《补充合同》",
    //                         'name': '测试证据名称',//证据名称
    //                         'content': '这里是测试证据名称，这里是测试证据名称',//证明内容。
    //                         'hasOriginal': true,//是否有原件：true，false
    //                         "extData": {
    //                             "supplementalAgreementSignDate": "23123214214"/*补充合同签订日期*/,
    //                             "thirdParty": "东莞团贷网互联网科技服务有限公司"/*委托第三方|示例:东莞团贷网互联网科技服务有限公司*/,
    //                             "beneficiaryAccountName": "吕武金吕武金"/*收款账号户名|示例:吕武金*/,
    //                             "beneficiaryAccountNumber": "6212262102020378453"/*收款账号|示例:6212262102020378453*/,
    //                             "bankOfdeposit": "中国工商银行"/*开户行|示例:中国工商银行*/
    //                         },
    //                         "files": [
    //                             {
    //                                 "fileName": "《补充合同》.pdf"/*文件类型范围:pdf*/,
    //                                 "fileKey": "ff801ab637267fb1f6ab961a3ff166d3}"/*fileKey*/
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         "materialCode": "《转账明细表》",
    //                         'name': '测试证据名称',//证据名称
    //                         'content': '这里是测试证据名称，这里是测试证据名称',//证明内容。
    //                         'hasOriginal': true,//是否有原件：true，false
    //                         "extData": {
    //                             "beneficiaryAccountName": "吕武金吕武金"/*收款账号户名|示例:吕武金*/,
    //                             "beneficiaryAccountNumber": "6212262102020378453"/*收款账号|示例:6212262102020378453*/,
    //                             "transactionDate": "2017年11月15日"/*转账日期|示例:2017年11月15日*/,
    //                             "transactionMoney": "151300.00"/*转账金额|示例:151300.00*/,
    //                             "bankOfdeposit": "ffsfsfs"/*开户行*/
    //                         },
    //                         "files": [
    //                             {
    //                                 "fileName": "《转账明细表》.pdf"/*文件类型范围:pdf*/,
    //                                 "fileKey": "ff801ab637267fb1f6ab961a3ff166d3}"/*fileKey*/
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         "materialCode": "《证明》",
    //                         "name": '测试证据名称',//证据名称
    //                         "content": '这里是测试证据名称，这里是测试证据名称',//证明内容。
    //                         "hasOriginal": true,//是否有原件：true，false
    //                         "extData": {
    //                             "transactionDate": "3132132321312"/*转账日期*/,
    //                             "paymentAccountName": "东莞团贷网互联网科技服务有限公司"/*付款账号户名|示例:东莞团贷网互联网科技服务有限公司*/,
    //                             "beneficiaryAccountName": "wwwewwrr"/*收款账号户名*/,
    //                             "beneficiaryAccountNumber": "6212262102020378453"/*收款账号|示例:6212262102020378453*/,
    //                             "IDCardNumber": "34244344324324324443", /*身份证号*/
    //                             "transactionMoney": "151300.00"/*转账金额|示例:151300.00*/
    //                         },
    //                         "files": [
    //                             {
    //                                 "fileName": "《证明》.pdf"/*文件类型范围:pdf*/,
    //                                 "fileKey": "ff801ab637267fb1f6ab961a3ff166d3}"/*fileKey*/
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         "materialCode": "《收款确认书》",
    //                         "name": "测试证据名称",//证据名称
    //                         "content": "这里是测试证据名称，这里是测试证据名称",//证明内容。
    //                         "hasOriginal": "true",//是否有原件：true，false
    //                         "extData": {
    //                             "lenderName": "fsdfsdfs"/*出借人姓名*/,
    //                             "borrowerName": "sfdffdf"/*借款人姓名*/,
    //                             "transactionDate": "232312"/*转账日期*/,
    //                             "transactionMoney": "151300.00"/*转账金额|示例:151300.00*/,
    //                             "cashPayDate": "44442343"/*现金支付日期*/,
    //                             "cashAmount": "8700.00"/*现金金额|示例:8700.00*/,
    //                             "confirmationSignDate": "2017年11月15日"/*确认书签订日期|示例:2017年11月15日*/
    //                         },
    //                         "files": [
    //                             {
    //                                 "fileName": "《收款确认书》.pdf"/*文件类型范围:pdf*/,
    //                                 "fileKey": "ff801ab637267fb1f6ab961a3ff166d3}"/*fileKey*/
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         "materialCode": "《不动产登记证明》《不动产权证书》",
    //                         "name": "测试证据名称",//证据名称
    //                         "content": "这里是测试证据名称，这里是测试证据名称",//证明内容。
    //                         "hasOriginal": "true",//是否有原件：true，false
    //                         "extData": {
    //                             "mortgageRegistrationDate": "2017年11月20日"/*抵押登记日期|示例:2017年11月20日*/,
    //                             "propertyAddress": "至少明确到市|示例:南宁市兴宁区秀厢大道103号澳华花园57号楼2单元101"/*抵押房产地址|描述:至少明确到市|示例:南宁市兴宁区秀厢大道103号澳华花园57号楼2单元101*/,
    //                             "realEstateRegistrationCertificateNumber": "桂（2017）南宁市不动产权第0208814号"/*不动产登记证明号码|示例:桂（2017）南宁市不动产权第0208814号*/,
    //                             "mortgagee": "郑联盛"/*抵押权人|描述:权利人（申请人）|示例:郑联盛*/,
    //                             "amountOfSecuredCaims": "160000.00"/*担保债权数额|示例:160000.00*/,
    //                             "mortgageTerm": "2017年11月15日至2018年11月14日"/*债权起止时间|示例:2017年11月15日至2018年11月14日*/,
    //                             "mortgagerName": "吕武金"/*抵押人姓名|示例:吕武金*/
    //                         },
    //                         "files": [
    //                             {
    //                                 "fileName": "《不动产登记证明》《不动产权证书》.pdf"/*文件类型范围:pdf*/,
    //                                 "fileKey": "ff801ab637267fb1f6ab961a3ff166d3}"/*fileKey*/
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         "materialCode": "《委托代理合同》及发票",
    //                         "name": "测试证据名称",//证据名称
    //                         "content": "这里是测试证据名称，这里是测试证据名称",//证明内容。
    //                         "hasOriginal": "true",//是否有原件：true，false
    //                         "extData": {
    //                             "borrowerName": "打法撒旦法"/*借款人姓名*/,
    //                             "lawyerfee": "21421"/*律师费*/
    //                         },
    //                         "files":[
    //                             {
    //                                 "fileName":"《委托代理合同》及发票.pdf"/*文件类型范围:pdf*/,
    //                                 "fileKey":"ff801ab637267fb1f6ab961a3ff166d3}"/*fileKey*/
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         "materialCode": "《还款情况表》",
    //                         "name": "测试证据名称",//证据名称
    //                         "content": "这里是测试证据名称，这里是测试证据名称",//证明内容。
    //                         "hasOriginal": "true",//是否有原件：true，false
    //                         "extData": {
    //                             "repaymentPrincipal": "0", /*已还本金*/
    //                             "overdueMonth": "12"/*逾期月份*/,
    //                             "overduePrincipal": "123", /*剩余本金*/
    //
    //                         },
    //                         "files":[
    //                             {
    //                                 "fileName":"《还款情况表》.pdf"/*文件类型范围:pdf*/,
    //                                 "fileKey":"ff801ab637267fb1f6ab961a3ff166d3}"/*fileKey*/
    //                             }
    //                         ]
    //                     }
    //                 ]
    //             }
    //         ]
    // };
    //
    // /**
    //  * 重新生成新条目时的数据
    //  */
    // var arbiApplyDataPure = {
    //     'overall': {
    //         'operaterType': '申请人', //操作者类型， 申请人、第三方
    //         'operater': '', //操作者名称
    //         'productCode': 'qidaifuturetech-p2p-1' //固定productCode
    //     },
    //     'claim': {
    //         "reason":""/*事实与理由|示例:操作*/,
    //         "claimItems":[
    //             {
    //                 "materialCode":"第（一）项仲裁请求",
    //                 "claimContent":""/*请求内容|示例:裁决两被申请人立即向申请人偿还借款本金680000元，并立即支付利息及违约金（利息及违约金以680000元为本金，按照每月2%的利率计算，自2018年9月19日起算，计至所有款项实际清偿之日止，暂计至2018年10月30日为¥19039.86元）；*/,
    //                 "claimType":"给付之诉"/*请求类型*/,
    //                 "disputeFee":""/*标的*/,
    //                 "payItem":"0"/*无标的请求项*/,
    //                 "litigants":""/*申请人*/,
    //                 "extData":{
    //                     "claimMoney":""/*请求本金*/,
    //                     "interestAndPenaltyClaimRate":""/*利息及违约金的请求利率|示例:24%*/,
    //                     "startDate":""/*起算日期*/
    //                 }
    //             },
    //             {
    //                 "materialCode":"第（二）项仲裁请求",
    //                 "claimContent":""/*请求内容*/,
    //                 "claimType":"给付之诉"/*请求类型*/,
    //                 "disputeFee":""/*标的*/,
    //                 "payItem":"0"/*无标的请求项*/,
    //                 "litigants":""/*申请人*/,
    //                 "extData":{
    //                     "lawyerFee":""/*律师费*/
    //                 }
    //             },
    //             {
    //                 "materialCode":"第（三）项仲裁请求",
    //                 "claimContent":""/*请求内容|示例:裁决申请人在本案债务范围内就拍卖、变卖被申请人名下对位于广东省汕头市金平区东厦路9号大洋花园7、8、9幢7幢301号全套房产所持有的份额部分所得价款享有优先受偿权*/,
    //                 "claimType":"给付之诉"/*请求类型*/,
    //                 "disputeFee":""/*标的*/,
    //                 "payItem":"0"/*无标的请求项*/,
    //                 "litigants":""/*申请人*/,
    //                 "extData":{
    //                     "propertyAddress":""/*抵押房产地址*/
    //                 }
    //             },
    //             {
    //                 "materialCode":"第（四）项仲裁请求",
    //                 "claimContent":""/*请求内容*/,
    //                 "claimType":"仲裁费"/*请求类型*/,
    //                 "disputeFee":""/*标的*/,
    //                 "payItem":""/*无标的请求项*/,
    //                 "litigants":""/*申请人*/
    //             }
    //         ],
    //         "files":[
    //             {
    //                 "fileName":"仲裁申请书.pdf"/*文件类型范围:pdf*/,
    //                 "fileKey":""/*fileKey*/
    //             }
    //         ]
    //     },
    //     'litigants': [
    //         {
    //             "materialCode":"出借人",
    //             "name":""/*名称*/,
    //             "nature":"自然人"/*类型*/,
    //             "mobiles":""/*联系号码*/,
    //             "contacts":""/*联系人*/,
    //             "idCardType":"身份证"/*证件类型*/,
    //             "idCardNo":""/*证件号码*/,
    //             "emails":""/*邮箱地址|非必填*/,
    //             "addresses":""/*联系地址*/,
    //             "sex":""/*性别|取值选择:['男','女']*/,
    //             "files":[
    //                 {
    //                     "fileName":"身份证正反面"/*文件类型范围:pdf/png/jpg*/,
    //                     "fileKey":""/*fileKey*/
    //                 }
    //             ],
    //             "litigantType":"申请人"/*当事人类型*/
    //         },
    //         {
    //             "materialCode":"出借人（企业）",
    //             "name":""/*名称*/,
    //             "nature":"企业"/*类型（填“企业”）*/,
    //             "mobiles":""/*手机号*/,
    //             "legalRepresent":""/*法定代表人*/,
    //             "idCardType":"身份证"/*法定代表人证件类型*/,
    //             "idCardNo":""/*法定代表人证件号码*/,
    //             "emails":""/*邮箱地址*/,
    //             "addresses":""/*联系地址*/,
    //             "identityType":""/*证照类型*/,
    //             "identityNo":""/*证照号码*/,
    //             "litigantType":"申请人"/*当事人类型*/
    //         },
    //         {
    //             "materialCode":"借款人",
    //             "name":""/*名称*/,
    //             "nature":"自然人"/*类型*/,
    //             "mobiles":""/*联系号码*/,
    //             "idCardType":"身份证"/*证件类型*/,
    //             "idCardNo":""/*证件号码*/,
    //             "emails":""/*邮箱地址|非必填*/,
    //             "addresses":""/*联系地址*/,
    //             "contacts":""/*联系人|非必填*/,
    //             "sex":""/*性别|取值选择:['男','女']*/,
    //             "files":[
    //                 {
    //                     "fileName":"身份证正反面"/*文件类型范围:pdf/png/jpg*/,
    //                     "fileKey":""/*fileKey*/
    //                 }
    //             ],
    //             "litigantType":"被申请人"/*当事人类型*/
    //         }
    //     ],
    //     'agents': [
    //         {
    //             'agentType': '律师代理',//代理人分类：律师代理、公民代理。
    //             'name': '',//代理人名称。
    //             'sex': '男',//性别：男、女。
    //             'identityType': '身份证',//证件类型。通过5.7查询全局字段信息接口获取证件类型。
    //             'identityNo': '',//证件号码。
    //             'mobiles': '',//联系号码。如有多个请用英文逗号分隔。
    //             'litigantType': '申请人',//当事人类型：申请人、被申请人、第三人
    //             'principals': '',//委托人名称。如果多个请用逗号分隔。
    //             'power': '一般代理',//代理权限：一般代理、特殊权限。
    //             'company': '',//公司名称。
    //             'emails': '',//联系邮箱。如有多个请用英文逗号分隔。
    //             'addresses': '',//联系地址。如有多个请用英文逗号分隔。
    //             "materialCode": "申请人代理人",
    //             "powerDetail": ""/*代理权限明细|非必填*/,
    //             "files": [
    //                 {
    //                     "fileName": "律师执业证.pdf"/*文件类型范围:pdf/jpg/png*/,
    //                     "fileKey": ""/*fileKey*/
    //                 },
    //                 {
    //                     "fileName": "授权委托书.pdf"/*文件类型范围:pdf/jpg/png*/,
    //                     "fileKey": ""/*fileKey*/
    //                 },
    //                 {
    //                     "fileName": "所函.pdf"/*文件类型范围:jpg/pdf/png*/,
    //                     "fileKey": ""/*fileKey*/
    //                 }
    //             ],
    //             'powerDetailArray': [
    //                 {'name': '代为提起仲裁请求', 'status': false},
    //                 {'name': '代为参加庭审、进行质证、辩论', 'status': false},
    //                 {'name': '代为和解、调解', 'status': false},
    //                 {'name': '代为主张、变更、放弃仲裁请求', 'status': false},
    //                 {'name': '代为签收法律文书', 'status': false},
    //                 {'name': '代为申请执行', 'status': false}
    //             ]//辅助记录特殊权限的数组数据, 提交数据到易简网前删除该字段数组
    //         }
    //     ],
    //     'evidences': [
    //         {
    //             "providerType": "申请方"/*提交方类型|取值选择:['申请方','被申请方']*/,
    //             "provider": ""/*提交者|示例:申请人姓名*/,
    //             "evidenceItems": [
    //                 {
    //                     "materialCode": "《借款抵押合同》",
    //                     'name': '',//证据名称
    //                     'content': '',//证明内容。
    //                     'hasOriginal': true,//是否有原件：true，false
    //                     "source":""/*来源|非必填*/,
    //                     "sourceId":""/*来源id|非必填*/,
    //                     "extData": {
    //                         "loanContractNumber": ""/*合同编号*/,
    //                         "loanContractSignDate": ""/*合同签订时间*/,
    //                         "borrowerServedMobile": ""/*借款人送达手机*/,
    //                         "borrowerServedMail": ""/*借款人送达邮箱*/,
    //                         "conventionalPrincipal": ""/*合同约定借款本金|示例:160000.00*/,
    //                         "loanTerm": ""/*借款期限|示例:2017年11月15日至2018年11月14日*/,
    //                         "conventionalInterestYearRate": ""/*借款年利率|示例:11%*/,
    //                         "repaymentMethod": ""/*还款方式|示例:先息后本，等额本息*/,
    //                         "PenaltyDayRate": ""/*违约金日利率|示例:3‰*/,
    //                         "borrowerName": ""/*借款人姓名|示例:吕武金*/,
    //                         "mortgagerName": ""/*抵押人姓名*/,
    //                         "propertyAddress": ""/*抵押房产地址*/,
    //                         "realEstateRegistrationCertificateNumber": ""/*不动产登记证明号码|示例:桂（2017）南宁市不动产证明第0208814号*/
    //                     },
    //                     "files":[
    //                         {
    //                             "fileName":"《借款抵押合同》.pdf"/*文件类型范围:pdf*/,
    //                             "fileKey":""/*fileKey*/
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "materialCode": "《补充合同》",
    //                     'name': '',//证据名称
    //                     'content': '',//证明内容。
    //                     'hasOriginal': true,//是否有原件：true，false
    //                     "source":""/*来源|非必填*/,
    //                     "sourceId":""/*来源id|非必填*/,
    //                     "extData": {
    //                         "supplementalAgreementSignDate": ""/*补充合同签订日期*/,
    //                         "thirdParty": ""/*委托第三方|示例:东莞团贷网互联网科技服务有限公司*/,
    //                         "beneficiaryAccountName": ""/*收款账号户名|示例:吕武金*/,
    //                         "beneficiaryAccountNumber": ""/*收款账号|示例:6212262102020378453*/,
    //                         "bankOfdeposit": ""/*开户行|示例:中国工商银行*/
    //                     },
    //                     "files": [
    //                         {
    //                             "fileName": "《补充合同》.pdf"/*文件类型范围:pdf*/,
    //                             "fileKey": ""/*fileKey*/
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "materialCode": "《转账明细表》",
    //                     'name': '',//证据名称
    //                     'content': '',//证明内容。
    //                     'hasOriginal': true,//是否有原件：true，false
    //                     "source":""/*来源|非必填*/,
    //                     "sourceId":""/*来源id|非必填*/,
    //                     "extData": {
    //                         "beneficiaryAccountName": ""/*收款账号户名|示例:吕武金*/,
    //                         "beneficiaryAccountNumber": ""/*收款账号|示例:6212262102020378453*/,
    //                         "transactionDate": ""/*转账日期|示例:2017年11月15日*/,
    //                         "transactionMoney": ""/*转账金额|示例:151300.00*/,
    //                         "bankOfdeposit": ""/*开户行*/
    //                     },
    //                     "files": [
    //                         {
    //                             "fileName": "《转账明细表》.pdf"/*文件类型范围:pdf*/,
    //                             "fileKey": ""/*fileKey*/
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "materialCode": "《证明》",
    //                     'name': '',//证据名称
    //                     'content': '',//证明内容。
    //                     'hasOriginal': true,//是否有原件：true，false
    //                     "source":""/*来源|非必填*/,
    //                     "sourceId":""/*来源id|非必填*/,
    //                     "extData": {
    //                         "transactionDate": ""/*转账日期*/,
    //                         "paymentAccountName": ""/*付款账号户名|示例:东莞团贷网互联网科技服务有限公司*/,
    //                         "beneficiaryAccountName": ""/*收款账号户名*/,
    //                         "beneficiaryAccountNumber": ""/*收款账号|示例:6212262102020378453*/,
    //                         "IDCardNumber": "", /*身份证号*/
    //                         "transactionMoney": ""/*转账金额|示例:151300.00*/
    //                     },
    //                     "files": [
    //                         {
    //                             "fileName": "《证明》.pdf"/*文件类型范围:pdf*/,
    //                             "fileKey": ""/*fileKey*/
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "materialCode": "《收款确认书》",
    //                     'name': '',//证据名称
    //                     'content': '',//证明内容。
    //                     'hasOriginal': true,//是否有原件：true，false
    //                     "source":""/*来源|非必填*/,
    //                     "sourceId":""/*来源id|非必填*/,
    //                     "extData": {
    //                         "lenderName": ""/*出借人姓名*/,
    //                         "borrowerName": ""/*借款人姓名*/,
    //                         "transactionDate": ""/*转账日期*/,
    //                         "transactionMoney": ""/*转账金额|示例:151300.00*/,
    //                         "cashPayDate": ""/*现金支付日期*/,
    //                         "cashAmount": ""/*现金金额|示例:8700.00*/,
    //                         "confirmationSignDate": ""/*确认书签订日期|示例:2017年11月15日*/
    //                     },
    //                     "files": [
    //                         {
    //                             "fileName": "《收款确认书》.pdf"/*文件类型范围:pdf*/,
    //                             "fileKey": ""/*fileKey*/
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "materialCode": "《不动产登记证明》《不动产权证书》",
    //                     'name': '',//证据名称
    //                     'content': '',//证明内容。
    //                     'hasOriginal': true,//是否有原件：true，false
    //                     "source":""/*来源|非必填*/,
    //                     "sourceId":""/*来源id|非必填*/,
    //                     "extData": {
    //                         "mortgageRegistrationDate": ""/*抵押登记日期|示例:2017年11月20日*/,
    //                         "propertyAddress": ""/*抵押房产地址|描述:至少明确到市|示例:南宁市兴宁区秀厢大道103号澳华花园57号楼2单元101*/,
    //                         "realEstateRegistrationCertificateNumber": ""/*不动产登记证明号码|示例:桂（2017）南宁市不动产权第0208814号*/,
    //                         "mortgagee": ""/*抵押权人|描述:权利人（申请人）|示例:郑联盛*/,
    //                         "amountOfSecuredCaims": ""/*担保债权数额|示例:160000.00*/,
    //                         "mortgageTerm": ""/*债权起止时间|示例:2017年11月15日至2018年11月14日*/,
    //                         "mortgagerName": ""/*抵押人姓名|示例:吕武金*/
    //                     },
    //                     "files": [
    //                         {
    //                             "fileName": "《不动产登记证明》《不动产权证书》.pdf"/*文件类型范围:pdf*/,
    //                             "fileKey": ""/*fileKey*/
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "materialCode": "《委托代理合同》及发票",
    //                     'name': '',//证据名称
    //                     'content': '',//证明内容。
    //                     'hasOriginal': true,//是否有原件：true，false
    //                     "source":""/*来源|非必填*/,
    //                     "sourceId":""/*来源id|非必填*/,
    //                     "extData": {
    //                         "borrowerName": ""/*借款人姓名*/,
    //                         "lawyerfee": ""/*律师费*/
    //                     },
    //                     "files":[
    //                         {
    //                             "fileName":"《委托代理合同》及发票.pdf"/*文件类型范围:pdf*/,
    //                             "fileKey":""/*fileKey*/
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "materialCode": "《还款情况表》",
    //                     'name': '',//证据名称
    //                     'content': '',//证明内容。
    //                     'hasOriginal': true,//是否有原件：true，false
    //                     "source":""/*来源|非必填*/,
    //                     "sourceId":""/*来源id|非必填*/,
    //                     "extData": {
    //                         "repaymentPrincipal": "", /*已还本金*/
    //                         "overdueMonth": ""/*逾期月份*/,
    //                         "overduePrincipal": "", /*剩余本金*/
    //                     },
    //                     "files":[
    //                         {
    //                             "fileName":"《还款情况表》.pdf"/*文件类型范围:pdf*/,
    //                             "fileKey":""/*fileKey*/
    //                         }
    //                     ]
    //                 }
    //             ]
    //         }
    //     ]
    // };


    return {
        extDataHelper:extDataHelper,
        // arbiApplyDataTest: arbiApplyDataTest,
        // arbiApplyDataPure: arbiApplyDataPure,
    }
});