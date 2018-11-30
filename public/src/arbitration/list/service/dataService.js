/**
 * Created by Administrator on 2018/11/7.
 */
var app = angular.module('Angular.arbilist');

app.factory('ArbiListDataSer', function () {

    var arbiApplyDataSupply = {
        //选项true or false设置
        'options': {
            'general': false,
            'claim': true,
            'litigants': false,
            'agents': false,
            'evidences': false
        },

        //通过5.7查询全局字段信息
        'overallVariable': {
            'post': ["军官证", "实习律师证", "律师执业证", "户口薄", "护照", "身份证", "驾照"],
            'idCardType': ["多证合一营业执照", "税务登记证", "组织机构代码证", "营业执照"],
            'identityType': ["主任", "总经理", "董事长", "行长"],
        },

        //诉讼事件声明
        'claimItems': {
            'claimContent': '证据请求内容',//请求内容
            'claimType': '确认之诉',//请求类型：确认之诉，给付之诉，形成之诉
            'disputeFee': 0, //请求标的
            'litigants': '当事人名称',//当事人名称
            'materialCode': '新增仲裁请求',//仲裁请求描述
            'extData': {}//附加数据
        },


        //当事人对象
        'litigants': {
            'litigantType': '申请人',//当事人分类。申请人、被申请人、第三人
            'nature': '自然人',//当事人性质：自然人、企业、个体户、其他组织。
            'name': '打蜡', //当事人性质为自然人时，请填写当事人姓名；当事人性质为企业、个体户和其他组织时，请填写机构名称。
            'mobiles': '18316433415', //联系号码。如有多个请用英文逗号分隔
            'contacts': '张三,李四',//联系人名称。如有多个请用英文逗号分隔。
            'sex': '男',//性别：男、女（自然人必填、个体户请填写负责人的性别）。
            'legalRepresent': '广州**有限公司',//法定代表人（企业、个体户必填）。
            'post': '总经理',//法定代表人职务（企业必填）。通过5.7查询全局字段信息接口获取职务。
            'idCardType': '身份证',//证件类型（自然人、个体户必填）。通过5.7查询全局字段信息接口获取证件类型。
            'idCardNo': '441721199312177617',//证件号码（自然人、个体户必填）。
            'identityType': '多证合一营业执照',//证照类型（企业、个体户、其他组织必填）。通过5.7查询全局字段信息接口获取证照类型。
            'identityNo': '92330165MA5AR7GB98',//营业执照号码（企业、个体户、其他组织必填）。
            'emails': 'berrsonbar@qq.com',//联系邮箱。如有多个请用英文逗号分隔。
            'addresses': '广东省阳江市***路,广东省**市答案了路',//联系地址。如有多个请用英文逗号分隔。
            'materialCode': '测试当事人对象数据信息',//材料名称，用于类型化案件。
            'files': []//附件，以JSON数组表示
        },

        //代理人对象
        'agents': {
            'agentType': '律师代理',//代理人分类：律师代理、公民代理。
            'name': '真三',//代理人名称。
            'sex': '男',//性别：男、女。
            'identityType': '身份证',//证件类型。通过5.7查询全局字段信息接口获取证件类型。
            'identityNo': '441721199312177617',//证件号码。
            'mobiles': '13243435533',//联系号码。如有多个请用英文逗号分隔。
            'litigantType': '申请人',//当事人类型：申请人、被申请人、第三人
            'principals': '委托人A,委托人B',//委托人名称。如果多个请用逗号分隔。
            'power': '一般代理',//代理权限：一般代理、特殊权限。
            'powerDetail': '',//如为特殊权限，则此项必填
            'company': '广州**有限公司',//公司名称。
            'emails': 'berrsonbar@qq.com',//联系邮箱。如有多个请用英文逗号分隔。
            'addresses': '广东省阳江市***路,广东省**市答案了路',//联系地址。如有多个请用英文逗号分隔。
            'materialCode': '测试代理人对象数据信息',//材料名称，用于类型化案件。
            'files': [],//附件，以JSON数组表示。

            'powerDetailArray': [
                {'name': '代为提起仲裁请求', 'status': false},
                {'name': '代为参加庭审、进行质证、辩论', 'status': false},
                {'name': '代为和解、调解', 'status': false},
                {'name': '代为主张、变更、放弃仲裁请求', 'status': false},
                {'name': '代为签收法律文书', 'status': false},
                {'name': '代为申请执行', 'status': false}
            ]//辅助记录特殊权限的数组数据, 提交数据到易简网前删除该字段数组
        },

        //证据对象
        'evidences': {
            'providerType': '申请方',//证据提供者类型：申请方、被申请方、第三方、其他
            'provider': '证据提供者名称1,证据提供者名称2',//证据提供者。如有多个请用英文逗号分隔
            'evidenceItems': []//证据项JSON数组。数组中为证据项JSON对象，具体内容请参看下表
        },

        //证据条目
        'evidenceItems': {
            'name': '测试证据名称',//证据名称
            'content': '这里是测试证据名称，这里是测试证据名称',//证明内容。
            'hasOriginal': true,//是否有原件：true，false
            'materialCode': '测试代理人对象数据信息',//材料名称，用于类型化案件。
            'files': [],//证据附件
            'extData': {} //其他数据信息
        }
    };

    //仲裁应用数据
    var arbiApplyData = {
        'overall': {
            'operaterType': '申请人', //操作者类型， 申请人、第三方
            'operater': '操作者名称', //操作者名称
            'productCode': 'qidaifuturetech-p2p-1' //固定productCode
        },
        'claim': {
            'reason': '输入事实与理由',//原因
            'files': [],//附件数组信息
            'claimItems': [
                {
                    "materialCode": "第（一）项仲裁请求",
                    "payItem": "0"/*无标的请求项*/,
                    'claimContent': '证据请求内容',//请求内容
                    'claimType': '确认之诉',//请求类型：确认之诉，给付之诉，形成之诉
                    'disputeFee': "", //请求标的
                    'litigants': '当事人名称',//当事人名称
                    "extData": {
                        "claimMoney": ""/*请求本金*/,
                        "interestAndPenaltyClaimRate": ""/*利息及违约金的请求利率|示例:24%*/,
                        "startDate": ""/*起算日期*/
                    }
                },
                {
                    "materialCode": "第（二）项仲裁请求",
                    "payItem": "0"/*无标的请求项*/,
                    'claimContent': '证据请求内容',//请求内容
                    'claimType': '确认之诉',//请求类型：确认之诉，给付之诉，形成之诉
                    'disputeFee': "", //请求标的
                    'litigants': '当事人名称',//当事人名称
                    "extData": {
                        "lawyerFee": ""/*律师费*/
                    }
                },
                {
                    "materialCode": "第（三）项仲裁请求",
                    "payItem": "0"/*无标的请求项*/,
                    'claimContent': '证据请求内容',//请求内容
                    'claimType': '确认之诉',//请求类型：确认之诉，给付之诉，形成之诉
                    'disputeFee': "", //请求标的
                    'litigants': '当事人名称',//当事人名称
                    "extData": {
                        "propertyAddress": ""/*抵押房产地址*/
                    }
                },
                {
                    "materialCode": "第（四）项仲裁请求",
                    "payItem": "0"/*无标的请求项*/,
                    'claimContent': '证据请求内容',//请求内容
                    'claimType': '确认之诉',//请求类型：确认之诉，给付之诉，形成之诉
                    'disputeFee': "", //请求标的
                    'litigants': '当事人名称',//当事人名称
                }
            ] //请求项内容
        },
        'litigants': [
            {
                'litigantType': '申请人',//当事人分类。申请人、被申请人、第三人
                'nature': '自然人',//当事人性质：自然人、企业、个体户、其他组织。
                'name': '打蜡', //当事人性质为自然人时，请填写当事人姓名；当事人性质为企业、个体户和其他组织时，请填写机构名称。
                'mobiles': '18316433415', //联系号码。如有多个请用英文逗号分隔
                'contacts': '张三,李四',//联系人名称。如有多个请用英文逗号分隔。
                'sex': '男',//性别：男、女（自然人必填、个体户请填写负责人的性别）。
                'legalRepresent': '广州**有限公司',//法定代表人（企业、个体户必填）。
                'post': '总经理',//法定代表人职务（企业必填）。通过5.7查询全局字段信息接口获取职务。
                'idCardType': '身份证',//证件类型（自然人、个体户必填）。通过5.7查询全局字段信息接口获取证件类型。
                'idCardNo': '441721199312177617',//证件号码（自然人、个体户必填）。
                'identityType': '多证合一营业执照',//证照类型（企业、个体户、其他组织必填）。通过5.7查询全局字段信息接口获取证照类型。
                'identityNo': '92330165MA5AR7GB98',//营业执照号码（企业、个体户、其他组织必填）。
                'emails': 'berrsonbar@qq.com',//联系邮箱。如有多个请用英文逗号分隔。
                'addresses': '广东省阳江市***路,广东省**市答案了路',//联系地址。如有多个请用英文逗号分隔。
                "materialCode": "出借人",
                'files': []//附件，以JSON数组表示
            },
            {
                'nature': '自然人',//当事人性质：自然人、企业、个体户、其他组织。
                'name': '打蜡', //当事人性质为自然人时，请填写当事人姓名；当事人性质为企业、个体户和其他组织时，请填写机构名称。
                'mobiles': '18316433415', //联系号码。如有多个请用英文逗号分隔
                'contacts': '张三,李四',//联系人名称。如有多个请用英文逗号分隔。
                'sex': '男',//性别：男、女（自然人必填、个体户请填写负责人的性别）。
                'legalRepresent': '广州**有限公司',//法定代表人（企业、个体户必填）。
                'post': '总经理',//法定代表人职务（企业必填）。通过5.7查询全局字段信息接口获取职务。
                'idCardType': '身份证',//证件类型（自然人、个体户必填）。通过5.7查询全局字段信息接口获取证件类型。
                'idCardNo': '441721199312177617',//证件号码（自然人、个体户必填）。
                'identityType': '多证合一营业执照',//证照类型（企业、个体户、其他组织必填）。通过5.7查询全局字段信息接口获取证照类型。
                'identityNo': '92330165MA5AR7GB98',//营业执照号码（企业、个体户、其他组织必填）。
                'emails': 'berrsonbar@qq.com',//联系邮箱。如有多个请用英文逗号分隔。
                'addresses': '广东省阳江市***路,广东省**市答案了路',//联系地址。如有多个请用英文逗号分隔。
                "materialCode": "借款人",
                "litigantType": "被申请人",/*当事人类型*/
                "files": []
            }
        ],
        'agents': [
            {
                'agentType': '律师代理',//代理人分类：律师代理、公民代理。
                'name': '真三',//代理人名称。
                'sex': '男',//性别：男、女。
                'identityType': '身份证',//证件类型。通过5.7查询全局字段信息接口获取证件类型。
                'identityNo': '441721199312177617',//证件号码。
                'mobiles': '13243435533',//联系号码。如有多个请用英文逗号分隔。
                'litigantType': '申请人',//当事人类型：申请人、被申请人、第三人
                'principals': '委托人A,委托人B',//委托人名称。如果多个请用逗号分隔。
                'power': '一般代理',//代理权限：一般代理、特殊权限。
                'company': '广州**有限公司',//公司名称。
                'emails': 'berrsonbar@qq.com',//联系邮箱。如有多个请用英文逗号分隔。
                'addresses': '广东省阳江市***路,广东省**市答案了路',//联系地址。如有多个请用英文逗号分隔。
                "materialCode": "申请人代理人",
                "powerDetail": "代为提起仲裁请求;代为参加庭审、进行质证、辩论;代为和解、调解;代为主张、变更、放弃仲裁请求;代为签收法律文书;代为申请执行等"/*代理权限明细|非必填*/,
                "files": [],
                'powerDetailArray': [
                    {'name': '代为提起仲裁请求', 'status': false},
                    {'name': '代为参加庭审、进行质证、辩论', 'status': false},
                    {'name': '代为和解、调解', 'status': false},
                    {'name': '代为主张、变更、放弃仲裁请求', 'status': false},
                    {'name': '代为签收法律文书', 'status': false},
                    {'name': '代为申请执行', 'status': false}
                ]//辅助记录特殊权限的数组数据, 提交数据到易简网前删除该字段数组
            }
        ],
        'evidences': [
            {
                "providerType": "申请方"/*提交方类型|取值选择:['申请方','被申请方']*/,
                "provider": "申请方姓名，打蜡"/*提交者|示例:申请人姓名*/,
                "evidenceItems": [
                    {
                        "materialCode": "《借款抵押合同》",
                        'name': '测试证据名称',//证据名称
                        'content': '这里是测试证据名称，这里是测试证据名称',//证明内容。
                        'hasOriginal': true,//是否有原件：true，false
                        "extData": {
                            "loanContractNumber": "3432423sdsaddsfsaf"/*合同编号*/,
                            "loanContractSignDate": "2019-10-23"/*合同签订时间*/,
                        }
                    },
                    {
                        "materialCode": "《补充合同》",
                        "name": ""/*名称*/,
                        "content": ""/*内容*/,
                        "hasOriginal": ""/*是否有原件*/,
                        "source": ""/*来源|非必填*/,
                        "sourceId": ""/*来源id|非必填*/,
                        "extData": {
                            "supplementalAgreementSignDate": "2019-02-01"/*补充合同签订日期*/,
                            "thirdParty": "第三方拉阿拉啦"/*委托第三方|示例:东莞团贷网互联网科技服务有限公司*/,
                        },
                        "files": [
                            {
                                "fileName": "《补充合同》.pdf"/*文件类型范围:pdf*/,
                                "fileKey": "342335325"/*fileKey*/
                            }
                        ]
                    },
                    {
                        "materialCode": "《转账明细表》",
                        'name': '测试证据名称',//证据名称
                        'content': '这里是测试证据名称，这里是测试证据名称',//证明内容。
                        'hasOriginal': true,//是否有原件：true，false
                        "extData": {
                            "beneficiaryAccountName": "吕武金"/*收款账号户名|示例:吕武金*/,
                            "beneficiaryAccountNumber": "3432432545465563635"/*收款账号|示例:6212262102020378453*/,
                        },
                        "files": []
                    },
                    {
                        "materialCode": "《证明》",
                        'name': '测试证据名称',//证据名称
                        'content': '这里是测试证据名称，这里是测试证据名称',//证明内容。
                        'hasOriginal': true,//是否有原件：true，false
                        "extData": {
                            "paymentAccountName": "法法师法防守打法"/*付款账号户名|示例:东莞团贷网互联网科技服务有限公司*/,
                            "transactionDate": "3224243242"/*转账日期*/,
                            "beneficiaryAccountName": "发斯蒂芬三方"/*收款账号户名*/,
                            "beneficiaryAccountNumber": "4343322"/*收款账号|示例:6212262102020378453*/,
                        },
                        "files": [
                            {
                                "fileName": "《证明》.pdf"/*文件类型范围:pdf*/,
                                "fileKey": "34234234232"/*fileKey*/
                            }
                        ]
                    },
                    {
                        "materialCode": "《收款确认书》",
                        'name': '测试证据名称',//证据名称
                        'content': '这里是测试证据名称，这里是测试证据名称',//证明内容。
                        'hasOriginal': true,//是否有原件：true，false
                        "extData": {
                            "borrowerName": "张三"/*借款人姓名*/,
                            "lenderName": "李四"/*出借人姓名*/
                        },
                        "files": [
                            {
                                "fileName": "《收款确认书》.pdf"/*文件类型范围:pdf*/,
                                "fileKey": "3234234324"/*fileKey*/
                            }
                        ]
                    },
                    {
                        "materialCode": "《不动产登记证明》《不动产权证书》",
                        'name': '测试证据名称',//证据名称
                        'content': '这里是测试证据名称，这里是测试证据名称',//证明内容。
                        'hasOriginal': true,//是否有原件：true，false
                        "extData": {
                            "mortgageRegistrationDate": "2017年11月20日"/*抵押登记日期|示例:2017年11月20日*/,
                            "propertyAddress": "打法撒旦法失搜的防守反击的孙菲菲了"/*抵押房产地址|描述:至少明确到市|示例:南宁市兴宁区秀厢大道103号澳华花园57号楼2单元101*/,
                        },
                        "files": [
                            {
                                "fileName": "《不动产登记证明》《不动产权证书》.pdf"/*文件类型范围:pdf*/,
                                "fileKey": "343243423424"/*fileKey*/
                            }
                        ]
                    },
                    {
                        "materialCode": "《委托代理合同》及发票",
                        'name': '测试证据名称',//证据名称
                        'content': '这里是测试证据名称，这里是测试证据名称',//证明内容。
                        'hasOriginal': true,//是否有原件：true，false
                        "extData": {
                            "borrowerName": "打法撒旦法"/*借款人姓名*/,
                            "lawyerfee": "21421"/*律师费*/
                        }
                    },
                    {
                        "materialCode": "《还款情况表》",
                        'name': '测试证据名称',//证据名称
                        'content': '这里是测试证据名称，这里是测试证据名称',//证明内容。
                        'hasOriginal': true,//是否有原件：true，false
                        "extData": {
                            "overdueMonth": "12"/*逾期月份*/,
                            "overduePrincipal": "34324"/*剩余本金*/
                        }
                    }
                ]
            }
        ]
    };


    //其他附加数据
    var extDataHelper = {
        'claimItems': {
            "claimMoney": {
                'name': "请求本金",
                'placeholder': ''
            },
            "startDate": {
                'name': "起算日期",
                'placeholder': ''
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
            }
        },

        'evidences': {
            "loanContractNumber": {
                'name': "合同编号",
                'placeholder': ''
            },
            "loanContractSignDate": {
                'name': "合同签订时间",
                'placeholder': ''
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
                'placeholder': ''
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
            }
        }
    };


    return {
        extDataHelper: extDataHelper,
        arbiApplyData: arbiApplyData,
        arbiApplyDataSupply: arbiApplyDataSupply
    }
});